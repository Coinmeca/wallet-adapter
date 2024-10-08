import { getChainById } from "chains";
import * as Core from "core/adapter";
import { WalletAccountError, WalletAddressError, WalletConnectionError, WalletSendTransactionError, WalletUserReject } from "core/errors";
import { Asset, Chain } from "types";
import { formatChainId, parseChainId } from "utils";
import { ProviderMessage, RequestArguments, Transaction } from "./module";

export interface WalletAdapterProps<Name extends string = string> extends Omit<Core.WalletAdapterProps<Name>, "sendTransaction"> {
	connect(chain?: number | string | Chain): Promise<string | string[] | undefined | void>;
	disconnect(): Promise<void>;
	chain(chain: number | string | Chain): Promise<Chain | null>;
	sendTransaction(tx: Transaction | Transaction[], success?: Function | Promise<any>, failure?: Function | Promise<any>): Promise<void>;
}

export type Wallet<Name extends string = string> = WalletAdapterProps<Name>;

export abstract class WalletAdapter<Name extends string = string> extends Core.WalletAdapter<Name> implements Wallet<Name> {
	protected abstract _accounts: string[] | null;

	get provider() {
		if (!this._provider) {
			window.addEventListener("eip6963:announceProvider", (event: any) => {
				if (event?.detail?.info?.name === this.name) this._provider = event.detail.provider;
			});
			window.dispatchEvent(new Event("eip6963:requestProvider"));
		}
		return this._provider;
	}

	async getAddress(): Promise<string[] | undefined | null> {
		return (await this.provider?.request({ method: "eth_accounts" })) as string[] | undefined | null;
	}

	async chain(chain?: number | string | Chain): Promise<Chain | null> {
		const c = chain;
		if (c) {
			chain = getChainById(parseChainId(c)) as Chain;
			await this.provider
				?.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: formatChainId(chain?.id),
							...(chain?.name && { chainName: chain?.name }),
							...(chain?.rpc && { rpcUrls: chain?.rpc }),
							...(chain?.explorer && { blockExplorerUrls: chain?.explorer }),
							...(chain?.nativeCurrency && { nativeCurrency: chain?.nativeCurrency }),
						},
					],
				})
				.then((success: any) => {
					if (success) this._chainChanged(c);
				});
		} else {
			await this.provider?.request({ method: "eth_chainId" }).then((chainId: string) => this._chainChanged(chainId));
		}
		return this._chain as Chain;
	}

	async message(msg: string, fn?: Function): Promise<void> {
		this.provider?.on("message", (message: ProviderMessage | any) => {
			if (typeof fn === "function") fn;
		});
	}

	async watchAsset({ type, address, symbol, decimals, image }: Asset): Promise<boolean> {
		if (!this.provider) throw new WalletConnectionError();
		return this.provider
			.request({
				method: "wallet_watchAsset",
				params: {
					type: type,
					options: {
						address,
						symbol,
						decimals,
						image,
					},
				},
			})
			.then((success: any) => {
				if (!success) throw new WalletUserReject();
				return true;
			});
	}

	protected async _accountChanged() {
		await this.provider
			?.request({ method: "eth_requestAccounts" })
			.then(async (accounts: any) => {
				if (!accounts || accounts?.length === 0) throw new WalletAccountError();
				this._accounts = accounts;

				this.provider!.on("chainChanged", this._chainChanged);
				this.provider!.on("accountsChanged", this._accountChanged);
				this.provider!.on("disconnect", this.disconnect);

				this.provider!.emit("connect", accounts[0]);
			})
			.catch(() => {
				throw new WalletAddressError();
			});
	}

	protected _chainChanged(chain: number | string | Chain) {
		this._chain = getChainById(parseChainId(chain)) as Chain;
	}

	async sendTransaction(tx: Transaction | Transaction[], success?: Function | Promise<any>, failure?: Function | Promise<any>): Promise<void> {
		tx = Array.isArray(tx) ? tx : [tx];

		await Promise.all(
			tx.map(
				async (params) =>
					await this.provider
						?.request({
							method: "eth_sendTransaction",
							params,
						})
						.then(async (txHash: any) => {
							if (txHash) {
								if (typeof params?.success === "function") await params.success(txHash);
							}
						})
						.catch(async (error: any) => {
							if (error) {
								if (typeof params?.failure === "function") await params.failure(error);
							}
						})
			)
		)
			.then(async (response: any) => {
				if (typeof success === "function") await success(response);
			})
			.catch(async (error: any) => {
				if (typeof failure === "function") await failure(error);
			});
	}

	async request(requests: RequestArguments | RequestArguments[], success?: Function | Promise<any>, failure?: Function | Promise<any>) {
		requests = Array.isArray(requests) ? requests : [requests];
		return Promise.all(
			requests.map(
				async (r, id) =>
					await this.provider
						?.request(r)
						.then(async (result: any) => {
							result = {
								jsonrpc: "2.0",
								id,
								result,
							};
							if (typeof r?.success === "function") await r?.success(result);
							return result;
						})
						.catch(async (error: any) => {
							if (typeof r?.failure === "function") await r?.failure(error);
							throw new WalletSendTransactionError(error);
						})
			)
		)
			.then(async (result: any) => typeof success === "function" && (await success(result)))
			.catch(async (error: any) => {
				typeof failure === "function" && (await failure(error));
				throw new WalletSendTransactionError(error);
			});
	}

	async signature(requests: any[]): Promise<string[]> {
		requests = Array.isArray(requests) ? requests : [requests];
		return await Promise.all(requests.map(async (params) => await this.provider?.request({ method: "eth_signTypedData_v4", params })));
	}

	on(listener: string, handler: Function | Promise<any>) {
		this.provider?.on(listener, handler);
	}
	off(listener: string, handler: Function | Promise<any>) {
		this.provider?.off(listener, handler);
	}
}

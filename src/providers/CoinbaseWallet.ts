import {
	EvmBaseWalletAdapter,
	isIosAndRedirectable,
	scopePollingDetectionStrategy,
	WalletName,
	WalletReadyState,
} from "base/adapter";
import {
	WalletNetworkError,
	WalletAccountError,
	WalletDisconnectionError,
	WalletNotConnectedError,
	WalletNotReadyError,
	WalletAddressError,
} from "base/errors";
import type { WalletConfig, Provider, RequestArguments } from "base/adapter";
import type { Chain } from "types";
import type { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { CoinbaseWalletSDK, type CoinbaseWalletSDKOptions } from "@coinbase/wallet-sdk/dist/CoinbaseWalletSDK";
import { isMobile } from "../states";

export const CoinbaseWalletName = "Coinbase" as WalletName<"Coinbase">;
export interface CoinbaseProvider extends Provider, CoinbaseWalletProvider {
	request<T>(args: RequestArguments): Promise<T>;
}
export interface CoinbaseWalletAdapterConfig extends WalletConfig { options?: CoinbaseWalletSDKOptions }

export class CoinbaseWalletAdapter extends EvmBaseWalletAdapter<WalletName<"Coinbase">> {

	name = CoinbaseWalletName;

	protected _config: CoinbaseWalletAdapterConfig | undefined;
	protected _state: WalletReadyState = WalletReadyState.NotDetected;

	protected _provider: CoinbaseProvider | null;
	protected _chain: Chain | null;
	protected _accounts: string[] | null;

	constructor(config?: CoinbaseWalletAdapterConfig) {
		super();

		this._provider = null;
		this._chain = null;
		this._accounts = null;

		if (config) this._config = config as CoinbaseWalletAdapterConfig;
		if (isIosAndRedirectable()) {
			if (this.provider) {
				this._state = WalletReadyState.Loadable;
				this.emit('readyStateChange', this._state);
			} else {
				this._state = WalletReadyState.Unsupported;
			}
		} else {
			scopePollingDetectionStrategy(() => {
				if (this.provider) {
					this._state = WalletReadyState.Installed;
					this.emit('readyStateChange', this._state);
					return true;
				} else return false;
			});
		}
	}

	get provider() {
		if (!this._provider) {
			this._provider = new CoinbaseWalletSDK({
				appName: this._config?.app?.name || '',
				appLogoUrl: this._config?.app?.logo,
			}).makeWeb3Provider(this._config?.rpc, this._config?.chainId);
		}
		return this._provider;
	}


	async autoConnect(): Promise<void> {
		if (this._state === WalletReadyState.Installed) {
			await this.connect();
		}
	}

	async connect(chain?: any): Promise<void> {
		try {
			if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://go.cb-w.com/dapp?cb_url=${window.location.host + window.location.pathname}`;

			if (!this.provider) throw new WalletNotReadyError();
			if (this.connected || this.connecting) return;
			// await this.detect();
			// if (this._state !== WalletReadyState.Installed) throw new WalletNotReadyError();

			this._connecting = true;
			try {
				await this.provider?.request({ method: "eth_requestAccounts" })
					.then((accounts: any) => {
						if (!accounts || accounts?.length === 0) throw new WalletAccountError();
						this._accounts = accounts;

						this.provider.on("chainChanged", (chainId: any) => this._chainChanged(chainId));
						this.provider.on("accountsChanged", (accounts: any) => this._accountChanged(accounts));
						this.provider.on("disconnect", this.disconnect);

						this.emit('connect', accounts[0]);
					})
					.catch(() => {
						throw new WalletAddressError();
					});
			} catch (error: any) {
				throw new WalletNotConnectedError(error?.message, error);
			}
		} catch (error: any) {
			this.emit("error", error);
		} finally {
			if (this._chain && this._chain.id !== chain.chainId && chain) {
				this.chain(chain).catch((error) => {
					throw new WalletNetworkError(error?.message, error);
				});
			}
		}
		this._connecting = false;
	}

	async disconnect(): Promise<void> {
		try {
			this.provider.off("chainChanged", this._chainChanged);
			this.provider.off("accountsChanged", this._accountChanged);
			this.provider.off("disconnect", this.disconnect);

			this._provider = null;
			this._accounts = null;

			this.emit("disconnect");
		} catch (e) {
			throw new WalletDisconnectionError(e?.toString());
		}
	}

	async sendTransaction(): Promise<void> {

	}
}
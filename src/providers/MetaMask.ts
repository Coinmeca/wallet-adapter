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
	WalletUserReject,
	WalletChangePlatform,
} from "base/errors";;
import type { Provider, ProviderMessage, WalletConfig } from "base/adapter";
import type { Asset, Chain } from "types";
import { isMobile } from "states";

import type MetaMaskEthereumProvider from "@metamask/detect-provider";
import { formatChainId } from "../utils/lib";
import detectEthereumProvider from "@metamask/detect-provider";

export const MetaMaskWalletName = "MetaMask" as WalletName<"MetaMask">;
type MetaMaskProviderProps = typeof MetaMaskEthereumProvider;

export interface MetaMaskProvider extends Provider, MetaMaskProviderProps { }
export interface MetaMaskWalletAdapterConfig extends WalletConfig {
	options?: {
		mustBeMetaMask?: boolean | undefined;
		silent?: boolean | undefined;
		timeout?: number | undefined;
	}
}

export class MetaMaskWalletAdapter extends EvmBaseWalletAdapter<"MetaMask"> {

	name = MetaMaskWalletName;

	protected _config: MetaMaskWalletAdapterConfig | undefined;
	protected _state: WalletReadyState = WalletReadyState.NotDetected;

	protected _provider: MetaMaskProvider | null;
	protected _chain: Chain | null;
	protected _accounts: string[] | null;

	constructor(config?: MetaMaskWalletAdapterConfig) {
		super();

		this._provider = null;
		this._chain = null;
		this._accounts = null;

		if (config) this._config = { ...config, options: { ...config?.options, mustBeMetaMask: true } } as MetaMaskWalletAdapterConfig;
		if (isIosAndRedirectable()) {
			if (this._provider) {
				this._state = WalletReadyState.Loadable;
				this.emit('readyStateChange', this._state);
			} else {
				this._state = WalletReadyState.Unsupported;
			}
		} else {
			scopePollingDetectionStrategy(() => {
				if (this._provider) {
					this._state = WalletReadyState.Installed;
					this.emit('readyStateChange', this._state);
					return true;
				} else return false;
			});
		}
	}

	async getProvider(): Promise<MetaMaskProvider | null> {
		if (!this._provider) {
			await detectEthereumProvider(this._config?.options).then(async (p) => {
				const provider = p as MetaMaskProvider;
				this._provider = provider.providers?.length
					? provider.providers.find((p) => p.providerMap).providerMap.get('MetaMask')
					?? (provider.providers.find((p) => p.isMetaMask)
						?? provider.providers[0])
					: provider;
			})
		}
		return this._provider
	}

	async autoConnect(): Promise<void> {
		if (this._state === WalletReadyState.Installed) {
			await this.connect();
		}
	}

	async connect(chain?: number | string | Chain): Promise<void> {
		try {
			if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `dapp://${window.location.host + window.location.pathname}`;
			const provider = await this.getProvider();
			// if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://metamask.app.link/dapp/${window.location.host + window.location.pathname}`;

			if (!provider) throw new WalletNotReadyError();
			if (this.connected || this.connecting) return;
			// await this.detect();
			// if (this._state !== WalletReadyState.Installed) throw new WalletNotReadyError();

			this._connecting = true;
			try {
				await provider.request({ method: "eth_requestAccounts" })
					.then((accounts: any) => {
						if (!accounts || accounts?.length === 0) throw new WalletAccountError();
						this._accounts = accounts;

						provider.on("chainChanged", (chainId: any) => this._chainChanged(chainId));
						provider.on("accountsChanged", (accounts: any) => this._accountChanged(accounts));
						provider.on("disconnect", this.disconnect);

						this.emit('connect', accounts[0]);
					}).catch(() => {
						throw new WalletAddressError();
					});
			} catch (error: any) {
				throw new WalletNotConnectedError(error?.message, error);
			}
		} catch (error: any) {
			this.emit("error", error);
		} finally {
			if (chain && (typeof chain === 'object' ? chain?.id === this._chain?.id : chain === this._chain?.id)) {
				this.chain(chain).catch((error) => {
					throw new WalletNetworkError(error?.message, error);
				});
			}
		}
		this._connecting = false;
	}

	async disconnect(): Promise<void> {
		try {
			const provider = await this.getProvider();

			provider!.off("chainChanged", this._chainChanged);
			provider!.off("accountsChanged", this._accountChanged);
			provider!.off("disconnect", this.disconnect);

			this._provider = null;
			this._accounts = null;

			this.emit("disconnect");
		} catch (e) {
			throw new WalletDisconnectionError(e?.toString());
		}
	}

	async sendTransaction(): Promise<void> {

	}

	async getAddress(): Promise<string[] | undefined | null> {
		const provider = await this.getProvider();
		return await provider?.request({ method: "eth_accounts" }) as (string[] | undefined | null);
	}

	async chain(chain: number | string | Chain): Promise<void> {
		const provider = await this.getProvider();
		return await provider?.request({ method: "wallet_addEthereumChain", params: [formatChainId(chain)] }).then((success: any) => { if (success) this._chainChanged(chain) });
	}

	async message(msg: string, fn?: Function): Promise<void> {
		const provider = await this.getProvider();
		provider?.on("message", (message: ProviderMessage | any) => {
			if (typeof fn === "function") fn;
		});
	}

	async watchAsset({ type, address, symbol, decimals, image }: Asset): Promise<boolean> {
		const provider = await this.getProvider();
		return provider?.request({
			method: 'wallet_watchAsset',
			params: {
				type: type,
				options: {
					address,
					symbol,
					decimals,
					image,
				},
			},
		}).then((success: any) => {
			if (!success) throw new WalletUserReject();
			return true;
		}) || false
	}
}

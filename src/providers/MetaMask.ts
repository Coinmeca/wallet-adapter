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
	WalletConnectionError,
	WalletUserReject,
} from "base/errors";;
import type { Provider, ProviderMessage, WalletConfig } from "base/adapter";
import type { Asset, Chain } from "types";
import { isMobile } from "states";

import type MetaMaskEthereumProvider from "@metamask/detect-provider";
import { formatChainId } from "../utils/lib";

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
			import('@metamask/detect-provider').then(async (p) => {
				const provider = await p.default(this._config?.options) as MetaMaskProvider;
				if (provider) this._provider = provider.providers?.length
					? (provider.providers.find((p) => p.isMetaMask)
						|| provider.providers.find((p) => p.providerMap).providerMap.get('MetaMask')
						|| provider.providers[0])
					: provider;

			})
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
			if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://metamask.app.link/dapp/${window.location}`;

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

						this.provider!.on("chainChanged", (chainId: any) => this._chainChanged(chainId));
						this.provider!.on("accountsChanged", (accounts: any) => this._accountChanged(accounts));
						this.provider!.on("disconnect", this.disconnect);

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
			this.provider!.off("chainChanged", this._chainChanged);
			this.provider!.off("accountsChanged", this._accountChanged);
			this.provider!.off("disconnect", this.disconnect);

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

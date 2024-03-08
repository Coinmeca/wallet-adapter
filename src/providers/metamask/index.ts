import { isIosAndRedirectable, scopePollingDetectionStrategy, WalletName, WalletReadyState, WalletConfig } from "core/adapter";
import {
	WalletNetworkError,
	WalletAccountError,
	WalletDisconnectionError,
	WalletNotConnectedError,
	WalletNotReadyError,
	WalletAddressError,
	WalletUserReject,
	WalletChangePlatform,
} from "core/errors";
import type { Provider } from "core/evm/module";
import { WalletAdapter } from "core/evm/adapter";
import type { Chain } from "types";
import { isMobile } from "utils";

import detectEthereumProvider from "@metamask/detect-provider";

export const MetaMaskWalletName = "MetaMask" as WalletName<"MetaMask">;
type MetaMaskProviderProps = typeof detectEthereumProvider;

export interface MetaMaskProvider extends Provider, MetaMaskProviderProps { }
export interface MetaMaskWalletAdapterConfig extends WalletConfig {
	options?: {
		mustBeMetaMask?: boolean | undefined;
		silent?: boolean | undefined;
		timeout?: number | undefined;
	};
}
export class MetaMaskWalletAdapter extends WalletAdapter<"MetaMask"> {
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
				this.provider.emit("readyStateChange", this._state);
			} else {
				this._state = WalletReadyState.Unsupported;
			}
		} else {
			scopePollingDetectionStrategy(() => {
				if (this.provider) {
					this._state = WalletReadyState.Installed;
					this.provider.emit("readyStateChange", this._state);
					return true;
				} else return false;
			});
		}
	}

	get provider() {
		if (!this._provider) {
			window.addEventListener("eip6963:announceProvider", (event: any) => {
				if (event?.detail?.info?.name === this.name) this._provider = event.detail.provider;
			});
			window.dispatchEvent(new Event("eip6963:requestProvider"));
		}
		return this._provider;
	}

	async autoConnect(): Promise<void> {
		if (this._state === WalletReadyState.Installed) {
			await this.connect();
		}
	}

	async connect(chain?: number | string | Chain): Promise<void> {
		let account = undefined;
		try {
			if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `dapp://${window.location.host + window.location.pathname}`;
			if (!this.provider) throw new WalletNotReadyError();
			if (this.connected || this.connecting) return;

			this._connecting = true;
			try {
				await this.provider
					.request({ method: "eth_requestAccounts" })
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
			} catch (error: any) {
				throw new WalletNotConnectedError(error?.message, error);
			}
		} catch (error: any) {
			this.provider?.emit("error", error);
		} finally {
			await this.chain(chain).catch((error) => {
				throw new WalletNetworkError(error?.message, error);
			});
		}
		this._connecting = false;
		return account;
	}

	async disconnect() {
		try {
			this.provider!.off("chainChanged", this._chainChanged);
			this.provider!.off("accountsChanged", this._accountChanged);
			this.provider!.off("disconnect", this.disconnect);

			this._provider = null;
			this._accounts = null;

			this.provider!.emit("disconnect");
			return true;
		} catch (e) {
			return false;
			throw new WalletDisconnectionError(e?.toString());
		}
	}
}

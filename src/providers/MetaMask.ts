import {
	BaseWalletAdapter,
	EventEmitter,
	isIosAndRedirectable,
	scopePollingDetectionStrategy,
	SendTransactionOptions,
	WalletName,
	WalletReadyState,
} from "base/adapter";
import {
	WalletNetworkError,
	WalletAccountError,
	WalletDisconnectedError,
	WalletDisconnectionError,
	WalletNotConnectedError,
	WalletNotReadyError,
	WalletAddressError,
	WalletError,
} from "base/errors";
import type { SupportedTransactionVersions, TransactionOrVersionedTransaction } from "base/transaction";
import type { Config, Provider, ProviderMessage, RequestArguments, Transaction } from "base/adapter";
import type { Connection } from "base/module";
import type { Chain } from "base/types";
import type MetaMaskEthereumProvider from "@metamask/detect-provider";
import { getNetworksById } from "chains";
import { isMobile } from "../states";

export const MetaMaskWalletName = "MetaMask" as WalletName<"MetaMask">;
type MetaMaskProviderProps = typeof MetaMaskEthereumProvider;
export interface MetaMaskProvider extends Provider, MetaMaskProviderProps { }
export interface MetaMaskWalletAdapterConfig extends Config { options?: Parameters<typeof MetaMaskEthereumProvider>[0] }


export class MetaMaskWalletAdapter extends BaseWalletAdapter<"MetaMask"> {
	// export class MetaMaskWalletAdapter {
	name = MetaMaskWalletName;

	private _connecting: boolean;
	private _provider: MetaMaskProvider | null;
	private _chain: Chain | undefined;
	private _accounts: string[] | null;
	private _config: MetaMaskWalletAdapterConfig | undefined;
	private _state: WalletReadyState = WalletReadyState.NotDetected;

	constructor(config?: MetaMaskWalletAdapterConfig) {
		super();

		this._connecting = false;
		this._accounts = null;
		this._provider = null;

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
				if (provider) this._provider = provider.providers?.length ? (provider.providers.find((p) => p.isMetaMask) ?? provider.providers[0]) : provider;

			})
		}
		return this._provider;
	}

	get address() {
		return this._accounts;
	}

	get connecting() {
		return this._connecting;
	}

	get connected() {
		return !!this._provider?.isConnected();
	}

	get state() {
		return this._state;
	}

	public supportedTransactionVersions?: SupportedTransactionVersions;

	async chain(chain: Chain): Promise<void> {
		return await this.provider?.request({ method: "wallet_addEthereumChain", params: [chain] }).then((resp: any) => {
			return resp;
		});
	}

	async autoConnect(): Promise<void> {
		if (this._state === WalletReadyState.Installed) {
			await this.connect();
		}
	}

	async connect(chain?: any): Promise<void> {
		try {
			if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://metamask.app.link/dapp/${this._config?.url}`;
			if (!this.provider) throw new WalletNotReadyError();
			if (this.connected || this.connecting) return;
			if (this._state !== WalletReadyState.Installed) throw new WalletNotReadyError();

			this._connecting = true;
			try {
				await this.provider
					.request({ method: "eth_requestAccounts" })
					.then(async () => {
						const accounts = await this.getAddress();
						if (!accounts || accounts?.length === 0) throw new WalletAccountError();
						this._accounts = accounts;

						this._provider?.on("chain", this.chain);
						this._provider?.on("accountsChanged", this._accountChanged);

						this.emit('connect', accounts[0]);
					})
					.catch(() => {
						throw new WalletAddressError();
					});
			} catch (error: any) {
				throw new WalletNotConnectedError(error?.message, error);
			}
			this.provider.on("disconnect", this._disconnected);
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
			this.provider!.off("disconnect", this._disconnected);
			this.provider!.off("accountsChanged", this._accountChanged);
			this._accounts = null;

			this.emit("disconnect");
		} catch (e) {
			this.emit("error", new WalletDisconnectionError());
		}
	}

	async getAddress(): Promise<string[] | undefined | null> {
		return await this.provider?.request({ method: "eth_accounts" }) as (string[] | undefined | null);
	}

	async getChainId(): Promise<Chain | undefined> {
		if (!this._chain && this.provider) {
			const chainId: string = await this.provider?.request({ method: "eth_chainId" }) as string;
			if (chainId) this._chain = getNetworksById(Number(chainId)) as Chain;
		}
		return this._chain;
	};

	async message(msg: string, fn?: Function): Promise<void> {
		this.provider?.on("message", (message: ProviderMessage) => {
			if (typeof fn === "function") fn;
		});
	}

	async sendTransaction(
		transaction: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>,
		connection: Connection,
		options?: SendTransactionOptions | undefined
	): Promise<any> { }

	private _disconnected = () => {
		try {
			this.provider?.off("disconnect", this._disconnected);
			this.provider?.off("accountsChanged", this._accountChanged);

			this._provider = null;
			this._accounts = null;
		} catch (e) {
			throw new WalletDisconnectionError(e?.toString());
		}
	};

	private _accountChanged = async () => {
		try {
			const accounts = await this.getAddress();
			if (!accounts || accounts?.length === 0) {
				this.connect();
			} else {
				this._accounts = accounts;
				this.emit('connect', accounts);
			}
		} catch (error: any) {
			this.emit("error", new WalletAddressError(error?.message, error));
		}
	};
}

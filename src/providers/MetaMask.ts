import {
	BaseWalletAdapter,
	EventEmitter,
	isIosAndRedirectable,
	scopePollingDetectionStrategy,
	SendTransactionOptions,
	WalletName,
	WalletReadyState,
} from "base/adapter";
import type MetaMaskEthereumProvider from "@metamask/detect-provider";
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
import type { Connection } from "base/module";
import type { Chain } from "base/types";

interface ProviderMessage {
	type: string;
	data: unknown;
}

interface MetaMaskArguments {
	method: string;
	params?: unknown[] | object;
}

interface MetaMaskTransaction {
	nonce?: string; // '0x00' ignored by MetaMask
	gasPrice?: string; // '0x09184e72a000' customizable by user during MetaMask confirmation.
	gas?: string; // '0x2710' customizable by user during MetaMask confirmation.
	to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
	from: string; // ethereum.selectedAddress // must match user's active address.
	value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
	data?: string;
	// '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
	chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
	hardfork?: string;
	returnTransaction?: boolean;
}

interface MetaMaskWalletEvents {
	connect(...args: unknown[]): unknown;
	disconnect(...args: unknown[]): unknown;
	accountChanged(newAddress: unknown): unknown;
}

interface MetaMaskWallet extends EventEmitter<typeof MetaMaskEthereumProvider> {
	isMetaMask?: boolean;
	isConnected(): boolean;
	providers?: any[];
	providerMap?: any;

	request(args: MetaMaskArguments): Promise<unknown>;
}

interface MetaMaskWindow extends Window {
	metamask?: {
		ethereum?: MetaMaskWallet;
	};
	ethereum?: MetaMaskWallet;
}

declare const window: MetaMaskWindow;

export interface MetaMaskWalletAdapterConfig {}

export const MetaMaskWalletName = "MetaMask" as WalletName<"MetaMask">;

export class MetaMaskWalletAdapter extends BaseWalletAdapter<"MetaMask"> {
	// export class MetaMaskWalletAdapter {
	name = MetaMaskWalletName;
	url = "https://metamask.io/";
	icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png";

	private _connecting: boolean;
	private _wallet: MetaMaskWallet | null;
	private _address: string[] | null;
	private _readyState: WalletReadyState =
		typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask === true ? WalletReadyState.Unsupported : WalletReadyState.NotDetected;

	constructor(config: MetaMaskWalletAdapterConfig = {}) {
		super();

		this._connecting = false;
		this._wallet = null;
		this._address = null;

		// To do
		if (this._readyState !== WalletReadyState.Unsupported) {
			if (isIosAndRedirectable()) {
				this._readyState = WalletReadyState.Loadable;
				// this.emit('readyStateChange', this._readyState);
			} else {
				scopePollingDetectionStrategy(() => {
					if (window.ethereum?.isMetaMask) {
						this._readyState = WalletReadyState.Installed;
						// this.emit('readyStateChange', this._readyState);
						return true;
					}
					return false;
				});
			}
		}

		this._readyState = WalletReadyState.Installed;
	}

	get address() {
		return this._address;
	}

	get connecting() {
		return this._connecting;
	}

	get connected() {
		return !!this._wallet?.isConnected();
	}

	get readyState() {
		return this._readyState;
	}

	public supportedTransactionVersions?: SupportedTransactionVersions;

	async chain(chain: Chain): Promise<void> {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isMetaMask);
		return wallet.request({ method: "wallet_addEthereumChain", params: [chain as Chain] }).then((resp: any) => {
			return resp;
		});
	}

	async autoConnect(): Promise<void> {
		if (this.readyState === WalletReadyState.Installed) {
			await this.connect();
		}
	}

	async connect(chain?: any): Promise<void> {
		try {
			const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isMetaMask);
			if (this.connected || this.connecting) return;
			if (this.readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

			this._connecting = true;
			// const wallet = (window.ethereum! as any).providerMap!.get('MetaMask')!;

			try {
				await wallet
					.request({ method: "eth_requestAccounts" })
					.then(async () => {
						const selectedAddress = await this.getAddress();
						if (selectedAddress?.length === 0) throw new WalletAccountError();

						this._address = selectedAddress;
						this._wallet = wallet;

						if (chain) {
							this.chain(chain).catch((error) => {
								throw new WalletNetworkError(error?.message, error);
							});
						}
					})
					.catch((error: any) => {
						throw new WalletAddressError();
					});
			} catch (error: any) {
				throw new WalletNotConnectedError(error?.message, error);
			}

			wallet.on("disconnect", this._disconnected);
			wallet.on("accountsChanged", this._accountChanged);

			// this.emit('connect', address);
		} catch (error: any) {
			this.emit("error", error);
		} finally {
			this._connecting = false;
		}
	}

	async disconnect(): Promise<void> {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isMetaMask);

		if (wallet) {
			wallet?.off("disconnect", this._disconnected);
			wallet?.off("accountsChanged", this._accountChanged);

			this._wallet = null;
			this._address = null;

			try {
				wallet.on("disconnect", (error: WalletError) => {
					new WalletDisconnectionError(error?.message, error);
				});
			} catch (error: any) {
				this.emit("error", new WalletDisconnectionError(error?.message, error));
			}
		}

		this.emit("disconnect");
	}

	async getAddress() {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isMetaMask);
		return await wallet.request({ method: "eth_accounts" });
	}

	async message(msg: string, fn?: Function): Promise<void> {
		const listener = window.metamask?.ethereum || window.ethereum!;
		const wallet = (listener as any).providerMap.get("MetaMask")!;
		wallet.on("message", (message: ProviderMessage) => {
			if (typeof fn === "function") fn;
		});
	}

	async sendTransaction(
		transaction: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>,
		connection: Connection,
		options?: SendTransactionOptions | undefined
	): Promise<any> {}

	private _disconnected = () => {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isMetaMask);

		if (wallet) {
			wallet.off("disconnect", this._disconnected);
			wallet.off("accountsChanged", this._accountChanged);

			this._wallet = null;
			this._address = null;

			// this.emit('error', new WalletDisconnectedError());
			// this.emit('disconnect');
		}
	};

	private _accountChanged = async () => {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isMetaMask);
		if (!wallet) return;

		try {
			const accounts = await this.getAddress();
			if (accounts.length === 0) {
				// MetaMask is locked or the user has not connected any accounts
				this.connect();
			} else {
				this._address = accounts;
				// Do any other work!
			}
		} catch (error: any) {
			this.emit("error", new WalletAddressError(error?.message, error));
		}
		// this.emit('connect', newAddress);
	};
}

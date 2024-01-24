// import type { EventEmitter, WalletName } from './index';

import {
	BaseWalletAdapter,
	EventEmitter,
	isIosAndRedirectable,
	scopePollingDetectionStrategy,
	SendTransactionOptions,
	WalletName,
	WalletReadyState,
} from "base/adapter";
import type { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
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
import type { Chain } from "types";

interface ProviderMessage {
	type: string;
	data: unknown;
}

interface CoinbaseArguments {
	method: string;
	params?: unknown[] | object;
}

interface CoinbaseWalletTransaction {
	nonce?: string; // '0x00' ignored by Coinbase
	gasPrice?: string; // '0x09184e72a000' customizable by user during Coinbase confirmation.
	gas?: string; // '0x2710' customizable by user during Coinbase confirmation.
	to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
	from: string; // ethereum.selectedAddress // must match user's active address.
	value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
	data?: string;
	// '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
	chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by Coinbase.
	hardfork?: string;
	returnTransaction?: boolean;
}

interface CoinbaseWalletEvents {
	connect(...args: unknown[]): unknown;
	disconnect(...args: unknown[]): unknown;
	accountChanged(newAddress: unknown): unknown;
}

interface CoinbaseWallet extends EventEmitter<typeof CoinbaseWalletProvider> {
	isCoinbase?: boolean;
	selectedAddress?: string[];
	isConnected(): boolean;
	// providerMap? : Map<K ,V>
	providerMap?: any;

	request(args: CoinbaseArguments): Promise<unknown>;
}

interface CoinbaseWindow extends Window {
	Coinbase?: {
		ethereum?: CoinbaseWallet;
	};
	ethereum?: CoinbaseWallet;
}

declare const window: CoinbaseWindow;

export interface CoinbaseWalletAdapterConfig {}

export const CoinbaseWalletName = "CoinbaseWallet" as WalletName<"CoinbaseWallet">;

export class CoinbaseWalletAdapter extends BaseWalletAdapter<"CoinbaseWallet"> {
	name = CoinbaseWalletName;
	url = "https://www.coinbase.com/wallet";
	icon = "https://avatars.githubusercontent.com/u/18060234?s=280&v=4";

	private _connecting: boolean;
	private _wallet: CoinbaseWallet | null;
	private _address: string[] | null;
	private _readyState: WalletReadyState =
		typeof window?.coinbaseWalletExtension !== "undefined" && window.coinbaseWalletExtension.isCoinbaseWallet === true
			? WalletReadyState.Unsupported
			: WalletReadyState.NotDetected;

	constructor(config: CoinbaseWalletAdapterConfig = {}) {
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
					if (window.ethereum?.isCoinbase) {
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
		const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;
		return wallet.request({ method: "wallet_addEthereumChain", params: [chain] }).then((resp: any) => {
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
			const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;
			if (!wallet.isCoinbaseWallet) return;
			if (this.connected || this.connecting) return;

			console.log("readyis", this.readyState);
			if (this.readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

			this._connecting = true;
			// const wallet = (window.ethereum! as any).providerMap!.get('Coinbase')!;

			let address: string[] | null = null;
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
		const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;

		if (wallet) {
			wallet.off("disconnect", this._disconnected);
			wallet.off("accountsChanged", this._accountChanged);

			this._wallet = null;
			this._address = null;

			try {
				await wallet.on("disconnect", (error: WalletError) => {
					new WalletDisconnectionError(error?.message, error);
				});
			} catch (error: any) {
				this.emit("error", new WalletDisconnectionError(error?.message, error));
			}
		}

		this.emit("disconnect");
	}

	async getAddress() {
		const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;
		return await wallet.request({ method: "eth_accounts" });
	}

	async message(msg: string, fn?: Function): Promise<void> {
		const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;
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
		const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;

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
		const wallet = this._wallet || window.ethereum?.providerMap?.get("CoinbaseWallet") || window.coinbaseWalletExtension;
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

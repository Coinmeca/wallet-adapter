import {
	BaseWalletAdapter,
	EventEmitter,
	isIosAndRedirectable,
	scopePollingDetectionStrategy,
	SendTransactionOptions,
	WalletName,
	WalletReadyState,
} from "base/adapter";
import type RainbowEthereumProvider from "@metamask/detect-provider";
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

interface RainbowArguments {
	method: string;
	params?: unknown[] | object;
}

interface RainbowTransaction {
	nonce?: string; // '0x00' ignored by Rainbow
	gasPrice?: string; // '0x09184e72a000' customizable by user during Rainbow confirmation.
	gas?: string; // '0x2710' customizable by user during Rainbow confirmation.
	to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
	from: string; // ethereum.selectedAddress // must match user's active address.
	value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
	data?: string;
	// '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
	chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by Rainbow.
	hardfork?: string;
	returnTransaction?: boolean;
}

interface RainbowWalletEvents {
	connect(...args: unknown[]): unknown;
	disconnect(...args: unknown[]): unknown;
	accountChanged(newAddress: unknown): unknown;
}

interface RainbowWallet extends EventEmitter<typeof RainbowEthereumProvider> {
	isRainbow?: boolean;
	isConnected(): boolean;
	providers?: any[];
	providerMap?: any;

	request(args: RainbowArguments): Promise<unknown>;
}

interface RainbowWindow extends Window {
	metamask?: {
		ethereum?: RainbowWallet;
	};
	ethereum?: RainbowWallet;
}

declare const window: RainbowWindow;

export interface RainbowWalletAdapterConfig { }

export const RainbowWalletName = "Rainbow" as WalletName<"Rainbow">;

export class RainbowWalletAdapter extends BaseWalletAdapter<"Rainbow"> {
	// export class RainbowWalletAdapter {
	name = RainbowWalletName;
	url = "https://rainbow.me/";
	icon = "https://framerusercontent.com/images/Hml6PtJwt03gwFtTRYmbpo7EarY.png";

	private _connecting: boolean;
	private _wallet: RainbowWallet | null;
	private _address: string[] | null;
	private _chain: any;
	private _readyState: WalletReadyState =
		typeof window.ethereum !== "undefined" && window.ethereum.isRainbow === true ? WalletReadyState.Unsupported : WalletReadyState.NotDetected;

	constructor(config: RainbowWalletAdapterConfig = {}) {
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
					if (window.ethereum?.isRainbow) {
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
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isRainbow);
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
			const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isRainbow);
			if (this.connected || this.connecting) return;
			if (this.readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

			this._connecting = true;
			// const wallet = (window.ethereum! as any).providerMap!.get('Rainbow')!;

			try {
				await wallet
					.request({ method: "eth_requestAccounts" })
					.then(async () => {
						const selectedAddress = await wallet.request({ method: "eth_accounts" });
						if (selectedAddress?.length === 0) throw new WalletAccountError();

						this._address = selectedAddress;
						this._wallet = wallet;
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
			// this.emit('error', error);
		} finally {
			if (this._chain && this._chain.chainId !== chain.chainId && chain) {
				this.chain(chain).catch((error) => {
					throw new WalletNetworkError(error?.message, error);
				});
			}

			this._connecting = false;
		}
	}

	async disconnect(): Promise<void> {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isRainbow);

		if (wallet) {
			wallet?.off("disconnect" as never, this._disconnected);
			wallet?.off("accountsChanged" as never, this._accountChanged);

			this._wallet = null;
			this._address = null;

			try {
				wallet.on("disconnect" as never, (error: WalletError) => {
					new WalletDisconnectionError(error?.message, error);
				});
			} catch (error: any) {
				// this.emit('error', new WalletDisconnectionError(error?.message, error));
			}
		}

		// this.emit('disconnect');
	}

	async getAddress() {
		const wallet = this._wallet || window.ethereum?.providers?.find((provider) => provider.isRainbow);
		return await wallet.request({ method: "eth_accounts" });
	}

	async message(msg: string, fn?: Function): Promise<void> {
		const listener = window.metamask?.ethereum || window.ethereum!;
		const wallet = (listener as any).providerMap.get("Rainbow")!;
		wallet.on("message", (message: ProviderMessage) => {
			if (typeof fn === "function") fn;
		});
	}

	async sendTransaction(
		transaction: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>,
		connection: Connection,
		options?: SendTransactionOptions | undefined
	): Promise<any> { }

	private _disconnected = () => {
		const wallet = this._wallet || window.metamask?.ethereum || window.ethereum!;
		if (wallet) {
			wallet.off("disconnect" as never, this._disconnected);
			wallet.off("accountsChanged" as never, this._accountChanged);

			this._wallet = null;
			this._address = null;

			// this.emit('error', new WalletDisconnectedError());
			// this.emit('disconnect');
		}
	};

	private _accountChanged = async (newAddress?: string[]) => {
		const listener = window.metamask?.ethereum || window.ethereum!;
		const wallet = this._wallet || (listener as any).providerMap.get("Rainbow")!;
		if (!wallet) return;

		try {
			await wallet.request({ method: "accountsChanged" }).then((accounts: any) => {
				if (accounts.length === 0) {
					// Rainbow is locked or the user has not connected any accounts
					console.log("Please connect to Rainbow.");
				} else if (accounts[0] !== this._address) {
					this._address = accounts[0];
					// Do any other work!
				}
			});
		} catch (error: any) {
			// this.emit('error', new WalletAddressError(error?.message, error));
		}

		// this.emit('connect', newAddress);
	};
}

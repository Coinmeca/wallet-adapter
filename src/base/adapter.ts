import EventEmitter from 'eventemitter3';
import { WalletConnectionError, WalletError, WalletNotConnectedError, WalletUserReject } from './errors';
import type { Connection, Account, Signer, SendOptions, Transaction as Tx, TransactionSignature, PublicKey } from './module';
import type { SupportedTransactionVersions, TransactionOrVersionedTransaction } from './transaction';
import { Asset, Chain } from 'types';
import { getNetworksById } from 'chains';
import { formatChainId, parseChainId } from 'utils';

export { EventEmitter };

export interface WalletConfig {
    rpc?: string;
    chainId?: number;
    options?: {
        [x: string | number | symbol]: any;
    },
    app?: {
        name?: string;
        url?: string;
        logo?: string;
        chains?: number[]
    }
}

export interface Provider extends EventEmitter {
    providers?: any[];
    isConnected(): boolean;
    request<T>(args: RequestArguments): Promise<T>;
};

export interface ProviderMessage {
    type: string;
    data: unknown;
}

export interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

export interface Transaction extends Tx {
    nonce?: string; // '0x00' ignored by Coinbase
    gasPrice?: string; // '0x09184e72a000' customizable by user during Coinbase confirmation.
    gas?: string; // '0x2710' customizable by user during Coinbase confirmation.
    to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
    from: string | any; // ethereum.selectedAddress // must match user's active address.
    value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
    data?: string;
    // '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
    chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by Coinbase.
    hardfork?: string;
    returnTransaction?: boolean;
}
export interface WalletAdapterEvents {
    connect(account: string | string[] | Account | Account[]): void;
    disconnect(): void;
    error(error: WalletError): void;
    readyStateChange(readyState: WalletReadyState): void;
}

export interface SendTransactionOptions extends SendOptions {
    signers?: string[] | Signer[];
}

// WalletName is a nominal type that wallet adapters should use, e.g. `'MyCryptoWallet' as WalletName<'MyCryptoWallet'>`
// https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d
export type WalletName<T extends string = string> = T & { __brand__: 'WalletName' };

export interface WalletAdapterProps<Name extends string = string> {
    name: WalletName<Name>;
    state: WalletReadyState;
    address: string;
    connected: boolean;

    autoConnect(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    // sendTransaction(): Promise<void>;
}

export type WalletAdapter<Name extends string = string> = WalletAdapterProps<Name> & EventEmitter<WalletAdapterEvents>;

/**
 * A wallet's readiness describes a series of states that the wallet can be in,
 * depending on what kind of wallet it is. An installable wallet (eg. a browser
 * extension like Phantom) might be `Installed` if we've found the Phantom API
 * in the global scope, or `NotDetected` otherwise. A loadable, zero-install
 * runtime (eg. Torus Wallet) might simply signal that it's `Loadable`. Use this
 * metadata to personalize the wallet list for each user (eg. to show their
 * installed wallets first).
 */
export enum WalletReadyState {
    /**
     * User-installable wallets can typically be detected by scanning for an API
     * that they've injected into the global context. If such an API is present,
     * we consider the wallet to have been installed.
     */
    Installed = 'Installed',
    NotDetected = 'NotDetected',
    /**
     * Loadable wallets are always available to you. Since you can load them at
     * any time, it's meaningless to say that they have been detected.
     */
    Loadable = 'Loadable',
    /**
     * If a wallet is not supported on a given platform (eg. server-rendering, or
     * mobile) then it will stay in the `Unsupported` state.
     */
    Unsupported = 'Unsupported',
}

export abstract class BaseWalletAdapter<Name extends string = string>
    extends EventEmitter<WalletAdapterEvents>
// implements WalletAdapter<Name>
{
    abstract name: WalletName<Name>;

    protected abstract _state: WalletReadyState;
    protected abstract _chain: string | number | Chain | null;
    protected abstract _accounts: any[] | null;
    protected _connecting: boolean = false;

    get state() {
        return this._state;
    };

    get address() {
        return Array.isArray(this._accounts) ? this._accounts[0] : this._accounts || '';
    }

    get connecting() {
        return this._connecting;
    }

    get connected() {
        return !!this._accounts;
    }

    abstract autoConnect(): Promise<void>;

    abstract connect(chain?: number | string | Chain): Promise<void>;

    abstract disconnect(): Promise<void>;

    // abstract sendTransaction(): Promise<void>;

    abstract chain(chain: number | string | Chain): Promise<void>;
}

export abstract class EvmBaseWalletAdapter<Name extends string = string> extends BaseWalletAdapter<Name> {
    protected abstract _provider: any | null;
    protected abstract _chain: Chain | null;
    protected abstract _accounts: string[] | null;

    get provider() {
        return this._provider;
    }

    async getAddress(): Promise<string[] | undefined | null> {
        return await this.provider?.request({ method: "eth_accounts" }) as (string[] | undefined | null);
    }

    async chain(chain: number | string | Chain): Promise<void> {
        chain = getNetworksById(parseChainId(chain)) as Chain;
        return await this.provider?.request({
            method: "wallet_addEthereumChain", params: [{
                chainId: "0x" + chain?.id?.toString(16),
                ...(chain?.name && { chainName: chain?.name }),
                ...(chain?.rpc && { rpcUrls: chain?.rpc }),
                ...(chain?.explorer && { blockExplorerUrls: chain?.explorer }),
                ...(chain?.nativeCurrency && { nativeCurrency: chain?.nativeCurrency }),
            }]
        }).then((success: any) => { if (success) this._chainChanged(chain) });
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
            })
            .then((success: any) => {
                if (!success) throw new WalletUserReject();
                return true
            })
    }

    protected _accountChanged(accounts: string | string[]) {
        if (accounts.length > 0) this._accounts = Array.isArray(accounts) ? accounts : [accounts];
    }

    protected _chainChanged(chain: number | string | Chain) {
        this._chain = getNetworksById(parseChainId(chain)) as Chain;
    }
}
export abstract class SvmBaseWalletAdapter<Name extends string = string> extends BaseWalletAdapter<Name> {
    protected abstract accounts: Account[] | null;
    abstract supportedTransactionVersions?: SupportedTransactionVersions;

    abstract sendTransaction(
        transaction: TransactionOrVersionedTransaction<this['supportedTransactionVersions']>,
        connection: Connection,
        options: SendTransactionOptions
    ): Promise<TransactionSignature>

    async prepareTransaction(
        transaction: Transaction,
        connection: Connection,
        options: SendOptions = {}
    ): Promise<Transaction> {
        const accounts = this.accounts;
        if (!accounts) throw new WalletNotConnectedError();

        transaction.feePayer = transaction.feePayer as PublicKey;
        transaction.recentBlockhash =
            transaction.recentBlockhash ||
            (
                await connection.getLatestBlockhash({
                    commitment: options.preflightCommitment,
                    minContextSlot: options.minContextSlot,
                })
            ).blockhash;

        return transaction;
    }
}


export function scopePollingDetectionStrategy(detect: () => boolean): void {
    // Early return when server-side rendering
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const disposers: (() => void)[] = [];

    function detectAndDispose() {
        const detected = detect();
        if (detected) {
            for (const dispose of disposers) {
                dispose();
            }
        }
    }

    // Strategy #1: Try detecting every second.
    const interval =
        // TODO: #334 Replace with idle callback strategy.
        setInterval(detectAndDispose, 1000);
    disposers.push(() => clearInterval(interval));

    // Strategy #2: Detect as soon as the DOM becomes 'ready'/'interactive'.
    if (
        // Implies that `DOMContentLoaded` has not yet fired.
        document.readyState === 'loading'
    ) {
        document.addEventListener('DOMContentLoaded', detectAndDispose, { once: true });
        disposers.push(() => document.removeEventListener('DOMContentLoaded', detectAndDispose));
    }

    // Strategy #3: Detect after the `window` has fully loaded.
    if (
        // If the `complete` state has been reached, we're too late.
        document.readyState !== 'complete'
    ) {
        window.addEventListener('load', detectAndDispose, { once: true });
        disposers.push(() => window.removeEventListener('load', detectAndDispose));
    }

    // Strategy #4: Detect synchronously, now.
    detectAndDispose();
}

/**
 * Users on iOS can be redirected into a wallet's in-app browser automatically,
 * if that wallet has a universal link configured to do so
 * But should not be redirected from within a webview, eg. if they're already
 * inside a wallet's browser
 * This function can be used to identify users who are on iOS and can be redirected
 *
 * @returns true if the user can be redirected
 */
export function isIosAndRedirectable() {
    // SSR: return false
    if (!navigator) return false;

    const userAgent = navigator.userAgent.toLowerCase();

    // if on iOS the user agent will contain either iPhone or iPad
    // caveat: if requesting desktop site then this won't work
    const isIos = userAgent.includes('iphone') || userAgent.includes('ipad');

    // if in a webview then it will not include Safari
    // note that other iOS browsers also include Safari
    // so we will redirect only if Safari is also included
    const isSafari = userAgent.includes('safari');

    return isIos && isSafari;
}
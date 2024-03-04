import EventEmitter from 'eventemitter3';
import { WalletError } from './errors';
import { Chain } from 'types';
import { Account } from './svm/module';

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
export interface WalletAdapterEvents {
    connect(chainId?: string): any;
    disconnect(chainId?: string): any;
    error(error: WalletError): any;
    readyStateChange(readyState: WalletReadyState): void;
    chainChanged(chainId: string): any;
    accountsChanged(accounts: string[] | Account[]): any;
}

export interface WalletAdapterProps<Name extends string = string> {
    name: WalletName<Name>;
    state: WalletReadyState;
    address: string | string[] | Account | Account[] | null;
    connecting: boolean;
    connected: boolean;

    autoConnect(): Promise<any>;
    connect(): Promise<any>;
    disconnect(): Promise<any>;
    // sendTransaction(): Promise<any>;
}

export type Wallet<Name extends string = string> = WalletAdapterProps<Name>;

// WalletName is a nominal type that wallet adapters should use, e.g. `'MyCryptoWallet' as WalletName<'MyCryptoWallet'>`
// https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d
export type WalletName<T extends string = string> = T & { __brand__: 'WalletName' };


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

export abstract class WalletAdapter<Name extends string = string>
    implements Wallet<Name>
{
    abstract name: WalletName<Name>;

    protected abstract _state: WalletReadyState;
    protected abstract _provider: any | null;
    protected abstract _chain: string | number | Chain | null;
    protected abstract _accounts: any[] | null;

    protected _connecting: boolean = false;

    abstract get provider(): any & EventEmitter<WalletAdapterEvents>;

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

    abstract connect(chain?: number | string | Chain): Promise<any>;

    abstract disconnect(): Promise<any>;

    // abstract sendTransaction(): Promise<void>;

    abstract chain(chain: number | string | Chain): Promise<any>;

    abstract on(listener: string, handler: Function | Promise<any>): void;

    abstract off(listener: string, handler: Function | Promise<any>): void;
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

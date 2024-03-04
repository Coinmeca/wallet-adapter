﻿import {
    isIosAndRedirectable,
    scopePollingDetectionStrategy,
    WalletName,
    WalletReadyState,
    WalletConfig
} from "core/adapter";
import {
    WalletNetworkError,
    WalletAccountError,
    WalletDisconnectionError,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletAddressError,
} from "core/errors";
import { WalletAdapter } from "core/evm/adapter";
import type { Provider, RequestArguments } from "core/evm/module";
import type { Chain } from "types";
import { isMobile } from "states";

import { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import type { CoinbaseWalletProviderOptions } from "@coinbase/wallet-sdk/dist/provider/CoinbaseWalletProvider";
import { CoinbaseWalletSDK, type CoinbaseWalletSDKOptions } from "@coinbase/wallet-sdk/dist/CoinbaseWalletSDK";
import _ from 'lodash';

export const CoinbaseWalletName = "CoinbaseWallet" as WalletName<"CoinbaseWallet">;
export interface CoinbaseProvider extends Provider, CoinbaseWalletProvider {
    request<T>(args: RequestArguments): Promise<T>;
}
export interface CoinbaseWalletAdapterConfig extends WalletConfig { options?: CoinbaseWalletSDKOptions & CoinbaseWalletProviderOptions }
export interface CoinbaseWalletMobileAdapter {
    method: string;
}
export class CoinbaseWalletAdapter extends WalletAdapter<WalletName<"CoinbaseWallet">> {

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

    get url() {
        return window.location.host + window.location.pathname;
    }

    get mobileRequest() {
        return Object.fromEntries(new URLSearchParams(Object.fromEntries(new URLSearchParams(location.search))?.cb_wallet))?.method;
    }

    async autoConnect(): Promise<void> {
        if (this._state === WalletReadyState.Installed) {
            await this.connect();
        }
    }

    async connect(chain?: number | string | Chain): Promise<void> {
        try {
            if (isMobile() && !this.mobileRequest) window.location.href = `https://go.cb-w.com/dapp?cb_url=${window.location.href}?cb_wallet=?method=eth_requestAccounts`;
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

                        this.provider.on("chainChanged", this._chainChanged);
                        this.provider.on("accountsChanged", this._accountChanged);
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
}

// export function CoinbaseWalletAdapter(config?: CoinbaseWalletAdapterConfig) {
//     return _.merge(new CoinbaseWalletProvider(config?.options as CoinbaseWalletProviderOptions), new CoinbaseWallet(config))
// }
import {
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
import type { Provider } from "core/evm/module";
import { WalletAdapter } from "core/evm/adapter";
import type { Chain } from "types";
import { isMobile } from "utils";

export const TrustWalletName = "Trust Wallet" as WalletName<"Trust Wallet">;
export interface TrustWalletProvider extends Provider { }
export interface TrustWalletAdapterConfig extends WalletConfig { }

export class TrustWalletAdapter extends WalletAdapter<"Trust Wallet"> {

    name = TrustWalletName;

    protected _config: TrustWalletAdapterConfig | undefined;
    protected _state: WalletReadyState = WalletReadyState.NotDetected;

    protected _provider: TrustWalletProvider | null;
    protected _chain: Chain | null;
    protected _accounts: string[] | null;

    constructor(config?: TrustWalletAdapterConfig) {
        super();

        this._provider = null;
        this._chain = null;
        this._accounts = null;

        if (config) this._config = config as TrustWalletAdapterConfig;
        if (isIosAndRedirectable()) {
            if (this.provider) {
                this._state = WalletReadyState.Loadable;
                // this.provider.emit('readyStateChange', this._state);
            } else {
                this._state = WalletReadyState.Unsupported;
            }
        } else {
            scopePollingDetectionStrategy(() => {
                if (this.provider) {
                    this._state = WalletReadyState.Installed;
                    // this.provider.emit('readyStateChange', this._state);
                    return true;
                } else return false;
            });
        }
    }

    async autoConnect(): Promise<void> {
        if (this._state === WalletReadyState.Installed) {
            await this.connect();
        }
    }

    async connect(chain?: number | string | Chain): Promise<void> {
        let account = undefined;
        try {
            // https://link.trustwallet.com/browser_enable
            if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `trust://${window.location.host + window.location.pathname}`;
            if (!this.provider) throw new WalletNotReadyError();
            if (this.connected || this.connecting) return;
            if (this._state !== WalletReadyState.Installed) throw new WalletNotReadyError();

            this._connecting = true;
            try {
                await this.provider?.request({ method: "eth_requestAccounts" })
                    .then((accounts: any) => {
                        if (!accounts || accounts?.length === 0) throw new WalletAccountError();
                        this._accounts = accounts;

                        this.provider!.on("chainChanged", this._chainChanged);
                        this.provider!.on("accountsChanged", this._accountChanged);
                        this.provider!.on("disconnect", this.disconnect);

                        // this.provider!.emit('connect', accounts[0]);
                    })
                    .catch((error: any) => {
                        throw new WalletAddressError(error?.message, error);
                    });

                if (chain) await this.chain(chain);
            } catch (error: any) {
                throw new WalletNotConnectedError(error?.message, error);
            }
        } catch (error: any) {
            // this.provider?.emit("error", error);
        }
        this._connecting = false;
        return account;
    }

    async disconnect(): Promise<void> {
        try {
            this.provider!.off("chainChanged", this._chainChanged);
            this.provider!.off("accountsChanged", this._accountChanged);
            this.provider!.off("disconnect", this.disconnect);

            this._provider = null;
            this._accounts = null;

            // this.provider!.emit("disconnect");
        } catch (e) {
            throw new WalletDisconnectionError(e?.toString());
        }
    }
}
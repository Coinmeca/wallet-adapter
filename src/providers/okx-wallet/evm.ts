import {
    isIosAndRedirectable,
    scopePollingDetectionStrategy,
    WalletConfig,
    WalletName,
    WalletReadyState
} from "core/adapter";
import {
    WalletAccountError,
    WalletAddressError,
    WalletDisconnectionError,
    WalletNotConnectedError,
    WalletNotReadyError
} from "core/errors";
import { WalletAdapter } from "core/evm/adapter";
import type { Provider } from "core/evm/module";
import type { Chain } from "types";
import { isMobile } from "utils";

export const OkxWalletName = "Okx Wallet" as WalletName<"Okx Wallet">;
export interface OkxWalletProvider extends Provider { }
export interface OkxWalletAdapterConfig extends WalletConfig { }

export class OkxWalletAdapter extends WalletAdapter<"Okx Wallet"> {

    name = OkxWalletName;

    protected _config: OkxWalletAdapterConfig | undefined;
    protected _state: WalletReadyState = WalletReadyState.NotDetected;

    protected _provider: OkxWalletProvider | null;
    protected _chain: Chain | null;
    protected _accounts: string[] | null;

    constructor(config?: OkxWalletAdapterConfig) {
        super();

        this._provider = null;
        this._chain = null;
        this._accounts = null;

        if (config) this._config = config as OkxWalletAdapterConfig;
        if (isIosAndRedirectable()) {
            if (this.provider) {
                this._state = WalletReadyState.Loadable;
                // this.provider?.emit('readyStateChange', this._state);
            } else {
                this._state = WalletReadyState.Unsupported;
            }
        } else {
            scopePollingDetectionStrategy(() => {
                if (this.provider) {
                    this._state = WalletReadyState.Installed;
                    // this.provider?.emit('readyStateChange', this._state);
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
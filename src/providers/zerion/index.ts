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

// import type { Wallet } from "@Zerion-me/Zerionkit";
// import type { ZerionWalletOptions } from "@Zerion-me/Zerionkit/dist/wallets/walletConnectors/ZerionWallet/ZerionWallet";

export const ZerionWalletName = "Zerion" as WalletName<"Zerion">;
export interface ZerionProvider extends Provider { }
export interface ZerionWalletAdapterConfig extends WalletConfig { }

export class ZerionWalletAdapter extends WalletAdapter<"Zerion"> {

    name = ZerionWalletName;

    protected _config: ZerionWalletAdapterConfig | undefined;
    protected _state: WalletReadyState = WalletReadyState.NotDetected;

    protected _provider: ZerionProvider | null;
    protected _chain: Chain | null;
    protected _accounts: string[] | null;

    constructor(config?: ZerionWalletAdapterConfig) {
        super();

        this._provider = null;
        this._chain = null;
        this._accounts = null;

        if (config) this._config = config as ZerionWalletAdapterConfig;
        if (isIosAndRedirectable()) {
            if (this.provider) {
                this._state = WalletReadyState.Loadable;
                this.provider.emit('readyStateChange', this._state);
            } else {
                this._state = WalletReadyState.Unsupported;
            }
        } else {
            scopePollingDetectionStrategy(() => {
                if (this.provider) {
                    this._state = WalletReadyState.Installed;
                    this.provider.emit('readyStateChange', this._state);
                    return true;
                } else return false;
            });
        }
    }

    get provider() {
        if (!this._provider) {
            window.addEventListener('eip6963:announceProvider', (event: any) => {
                if (event?.detail?.info?.name === this.name) this._provider = event.detail.provider
            });
            window.dispatchEvent(new Event('eip6963:requestProvider'));
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
            if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://rnbwapp.com/wc?uri=${window.location.host + window.location.pathname}`;

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

                        this.provider!.emit('connect', accounts[0]);
                    }).catch(() => {
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

    async disconnect(): Promise<void> {
        try {
            this.provider!.off("chainChanged", this._chainChanged);
            this.provider!.off("accountsChanged", this._accountChanged);
            this.provider!.off("disconnect", this.disconnect);

            this._provider = null;
            this._accounts = null;

            this.provider!.emit("disconnect");
        } catch (e) {
            throw new WalletDisconnectionError(e?.toString());
        }
    }
}
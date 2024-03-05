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

export const PhantomWalletName = "Phantom" as WalletName<"Phantom">;
export interface PhantomProvider extends Provider { }

export class EvmAdapter extends WalletAdapter<WalletName<"Phantom">> {

    name = PhantomWalletName;

    protected _config: WalletConfig | undefined;
    protected _state: WalletReadyState = WalletReadyState.NotDetected;

    protected _provider: PhantomProvider | null;
    protected _chain: Chain | null;
    protected _accounts: string[] | null;

    constructor(config?: WalletConfig) {
        super();

        this._provider = null;
        this._chain = null;
        this._accounts = null;

        if (config) this._config = config as WalletConfig;
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
            this._provider = (window?.ethereum as any)?.provider?.find((p: any) => p.isPhantom);
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
            // if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://go.cb-w.com/dapp?cb_url=${this._config?.url}`;

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
                    })
                    .catch(() => {
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
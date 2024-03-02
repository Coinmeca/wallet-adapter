import {
    EvmBaseWalletAdapter,
    isIosAndRedirectable,
    scopePollingDetectionStrategy,
    WalletName,
    WalletReadyState,
} from "base/adapter";
import {
    WalletNetworkError,
    WalletAccountError,
    WalletDisconnectionError,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletAddressError,
} from "base/errors";
import type { WalletConfig, Provider, RequestArguments } from "base/adapter";
import type { Chain } from "types";

export const PhantomWalletName = "Phantom" as WalletName<"Phantom">;
export interface CoinbaseProvider extends Provider {
    request<T>(args: RequestArguments): Promise<T>;
}

export class PhantomWalletAdapter extends EvmBaseWalletAdapter<WalletName<"Phantom">> {

    name = PhantomWalletName;

    protected _config: WalletConfig | undefined;
    protected _state: WalletReadyState = WalletReadyState.NotDetected;

    protected _provider: CoinbaseProvider | null;
    protected _chain: Chain | null;
    protected _accounts: string[] | null;

    constructor(config?: WalletConfig) {
        super();

        this._provider = null;
        this._chain = null;
        this._accounts = null;

        if (config) this._config = config as WalletConfig;
        if (isIosAndRedirectable()) {
            if (this._provider) {
                this._state = WalletReadyState.Loadable;
                this.emit('readyStateChange', this._state);
            } else {
                this._state = WalletReadyState.Unsupported;
            }
        } else {
            scopePollingDetectionStrategy(() => {
                if (this._provider) {
                    this._state = WalletReadyState.Installed;
                    this.emit('readyStateChange', this._state);
                    return true;
                } else return false;
            });
        }
    }

    get provider() {
        if (!this._provider) {
            if ('phantom' in window) {
                this._provider = (window?.phantom as any)?.ethereum;
            } else if ('ethereum' in window) {
                this._provider = (window?.ethereum as any)?.provider?.find((p: any) => p.isPhantom);
            }
        }
        return this._provider;
    }


    async autoConnect(): Promise<void> {
        if (this._state === WalletReadyState.Installed) {
            await this.connect();
        }
    }

    async connect(chain?: any): Promise<void> {
        try {
            // if (isMobile() && !window?.navigator.userAgent.includes(this.name)) window.location.href = `https://go.cb-w.com/dapp?cb_url=${this._config?.url}`;

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

                        this.provider!.on("chainChanged", (chainId: any) => this._chainChanged(chainId));
                        this.provider!.on("accountsChanged", (accounts: any) => this._accountChanged(accounts));
                        this.provider!.on("disconnect", this.disconnect);

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
            if (this._chain && this._chain.id !== chain.chainId && chain) {
                this.chain(chain).catch((error) => {
                    throw new WalletNetworkError(error?.message, error);
                });
            }
        }
        this._connecting = false;
    }

    async disconnect(): Promise<void> {
        try {
            this.provider!.off("chainChanged", this._chainChanged);
            this.provider!.off("accountsChanged", this._accountChanged);
            this.provider!.off("disconnect", this.disconnect);

            this._provider = null;
            this._accounts = null;

            this.emit("disconnect");
        } catch (e) {
            throw new WalletDisconnectionError(e?.toString());
        }
    }

    async sendTransaction(): Promise<void> {

    }
}
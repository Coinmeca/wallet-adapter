import * as Core from 'core/adapter';
import { EventEmitter } from 'core/adapter';
import { WalletConnectionError, WalletError, WalletUserReject } from 'core/errors';
import { Asset, Chain } from 'types';
import { getNetworksById } from 'chains';
import { formatChainId, parseChainId } from 'utils';
import { ProviderMessage, TransactionArgs } from './module';

export interface WalletAdapterProps<Name extends string = string> extends Core.WalletAdapterProps<Name> {
    connect(chain?: number | string | Chain): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(...args: TransactionArgs): Promise<void>;
}

export type Wallet<Name extends string = string> = WalletAdapterProps<Name> & EventEmitter<Core.WalletAdapterEvents>;

export abstract class WalletAdapter<Name extends string = string> extends Core.WalletAdapter<Name> implements Wallet<Name> {
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

    abstract sendTransaction(...args: TransactionArgs): Promise<void>;
}
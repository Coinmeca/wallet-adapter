import * as Core from 'core/adapter';
import { EventEmitter } from 'core/adapter';
import { WalletConnectionError, WalletError, WalletSendTransactionError, WalletUserReject } from 'core/errors';
import { Asset, Chain } from 'types';
import { getNetworksById } from 'chains';
import { formatChainId, parseChainId } from 'utils';
import { ProviderMessage, RequestArguments, Transaction } from './module';

export interface WalletAdapterProps<Name extends string = string> extends Omit<Core.WalletAdapterProps<Name>, 'sendTransaction'> {
    connect(chain?: number | string | Chain): Promise<void>;
    disconnect(): Promise<void>;
    chain(chain: number | string | Chain): Promise<void>;
    sendTransaction(tx: Transaction | Transaction[], success?: Function | Promise<any>, failure?: Function | Promise<any>): Promise<void>;
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

    async sendTransaction(tx: Transaction | Transaction[], success?: Function | Promise<any>, failure?: Function | Promise<any>): Promise<void> {
        tx = Array.isArray(tx) ? tx : [tx]

        await Promise.all(tx.map(async (params) => await this.provider.request({
            method: 'eth_sendTransaction',
            params,
        }).then(async (txHash: any) => {
            if (txHash) {
                if (typeof params?.success === 'function') await params.success(txHash);
            }
        }).catch(async (error: any) => {
            if (error) {
                if (typeof params?.failure === 'function') await params.failure(error);
            }
        }))).then(async (response: any) => {
            if (typeof success === 'function') await success(response);
        }).catch(async (error: any) => {
            if (typeof failure === 'function') await failure(error);
        })
    }

    async request(requests: RequestArguments | RequestArguments[], success?: Function | Promise<any>, failure?: Function | Promise<any>) {
        requests = Array.isArray(requests) ? requests : [requests];
        return Promise.all(requests.map(async (r, id) =>
            await this.provider.request(r)
                .then(async (result: any) => {
                    result = {
                        jsonrpc: '2.0',
                        id,
                        result,
                    };
                    if (typeof r?.success === 'function') await r?.success(result);
                    return result;
                })
                .catch(async (error: any) => {
                    if (typeof r?.failure === 'function') await r?.failure(error);
                    throw new WalletSendTransactionError(error);
                })
        ))
            .then(async (result: any) => typeof success === 'function' && await success(result))
            .catch(async (error: any) => {
                typeof failure === 'function' && await failure(error);
                throw new WalletSendTransactionError(error);
            });
    }
}
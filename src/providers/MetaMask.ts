// import type { EventEmitter, WalletName } from './index';

import { EventEmitter, isIosAndRedirectable, scopePollingDetectionStrategy, WalletName, WalletReadyState } from 'base/adapter';
import type MetaMaskEthereumProvider from '@metamask/detect-provider';
import {
    WalletNetworkError,
    WalletAccountError,
    WalletDisconnectedError,
    WalletDisconnectionError,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletAddressError,
    WalletError
} from 'base/errors';
// } from '@solana/wallet-adapter-base';
import { SendOptions, Transaction, TransactionSignature, VersionedTransaction } from 'base';
import type { WalletAdapterNetwork } from 'base/types';
import type { Chain } from 'types';

interface ProviderMessage {
    type: string;
    data: unknown;
}

interface MetaMaskArguments {
    method: string;
    params?: unknown[] | object;
}

interface MetaMaskTransaction {
    nonce?: string; // '0x00' ignored by MetaMask
    gasPrice?: string; // '0x09184e72a000' customizable by user during MetaMask confirmation.
    gas?: string; // '0x2710' customizable by user during MetaMask confirmation.
    to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
    from: string; // ethereum.selectedAddress // must match user's active address.
    value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
    data?: string;
    // '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
    chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    hardfork?: string;
    returnTransaction?: boolean;
}

interface MetaMaskWalletEvents {
    connect(...args: unknown[]): unknown;
    disconnect(...args: unknown[]): unknown;
    accountChanged(newAddress: unknown): unknown;
}

interface MetaMaskWallet extends EventEmitter<typeof MetaMaskEthereumProvider> {
    isMetaMask?: boolean;
    selectedAddress?: string[];
    isConnected(): boolean;
    // providerMap? : Map<K ,V>
    providerMap?: any;

    request(args: MetaMaskArguments): Promise<unknown>;
}

interface MetaMaskWindow extends Window {
    metamask?: {
        ethereum?: MetaMaskWallet;
    };
    ethereum?: MetaMaskWallet;
}

declare const window: MetaMaskWindow;

export interface MetaMaskWalletAdapterConfig { }

export const MetaMaskWalletName = 'MetaMask' as WalletName<'MetaMask'>;

// export class MetaMaskWalletAdapter extends BaseMessageSignerWalletAdapter {
export class MetaMaskWalletAdapter {
    name = MetaMaskWalletName;
    url = 'https://metamask.io/';
    icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png';

    private _connecting: boolean;
    private _wallet: MetaMaskWallet | null;
    private _address: string[] | null;
    private _readyState: WalletReadyState =
        typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask === true
            ? WalletReadyState.Unsupported
            : WalletReadyState.NotDetected;

    constructor(config: MetaMaskWalletAdapterConfig = {}) {
        // super();

        this._connecting = false;
        this._wallet = null;
        this._address = null;

        // To do
        if (this._readyState !== WalletReadyState.Unsupported) {
            if (isIosAndRedirectable()) {
                this._readyState = WalletReadyState.Loadable;
                // this.emit('readyStateChange', this._readyState);
            } else {
                scopePollingDetectionStrategy(() => {
                    if (window.ethereum?.isMetaMask) {
                        this._readyState = WalletReadyState.Installed;
                        // this.emit('readyStateChange', this._readyState);
                        return true;
                    }
                    return false;
                });
            }
        }

        this._readyState = WalletReadyState.Installed;
    }

    get address() {
        return this._address;
    }

    get connecting() {
        return this._connecting;
    }

    get connected() {
        return !!this._wallet?.isConnected();
    }

    get readyState() {
        return this._readyState;
    }

    async chain(chain: Chain): Promise<void> {
        const wallet = window.ethereum?.providerMap?.get('MetaMask') || window.ethereum;
        return wallet.request({ method: 'wallet_addEthereumChain', params: [chain as Chain] }).then((resp: any) => {
            return resp;
        });
    }

    async autoConnect(): Promise<void> {
        if (this.readyState === WalletReadyState.Installed) {
            await this.connect();
        }
    }

    async connect(chain?: any): Promise<void> {
        try {
            const wallet = window.ethereum?.providerMap?.get('MetaMask') || window.ethereum;
            if (!wallet?.isMetaMask) return;
            if (this.connected || this.connecting) return;

            console.log('readyis', this.readyState);
            if (this.readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

            this._connecting = true;
            // const wallet = (window.ethereum! as any).providerMap!.get('MetaMask')!;

            let address: string[] | null = null;
            try {
                if (chain) {
                    this.chain(chain).catch((error) => {
                        throw new WalletNetworkError(error?.message, error);
                    });
                }
                await wallet
                    .request({ method: 'eth_requestAccounts' })
                    .then((selectedAddress: string[] | null) => {
                        if (wallet.selectedAddress?.length === 0) throw new WalletAccountError();
                        address = selectedAddress;
                    })
                    .catch((error: any) => {
                        throw new WalletAddressError();
                    });
            } catch (error: any) {
                throw new WalletNotConnectedError(error?.message, error);
            }

            wallet.on('disconnect', this._disconnected);
            wallet.on('accountsChanged', this._accountChanged);

            this._wallet = wallet;
            this._address = address;

            // this.emit('connect', address);
        } catch (error: any) {
            // this.emit('error', error);
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        const wallet = this._wallet || window.metamask?.ethereum || window.ethereum!;

        if (wallet) {
            wallet?.off('disconnect' as never, this._disconnected);
            wallet?.off('accountsChanged' as never, this._accountChanged);

            this._wallet = null;
            this._address = null;

            try {
                await wallet.on('disconnect' as never, (error: WalletError) => {
                    new WalletDisconnectionError(error?.message, error);
                });
            } catch (error: any) {
                // this.emit('error', new WalletDisconnectionError(error?.message, error));
            }
        }

        // this.emit('disconnect');
    }

    async message(msg: string, fn?: Function): Promise<void> {
        const listener = window.metamask?.ethereum || window.ethereum!;
        const wallet = (listener as any).providerMap.get('MetaMask')!;
        wallet.on('message', (message: ProviderMessage) => {
            if (typeof fn === 'function') fn;
        });
    }

    private _disconnected = () => {
        const wallet = this._wallet || window.metamask?.ethereum || window.ethereum!;
        if (wallet) {
            wallet.off('disconnect' as never, this._disconnected);
            wallet.off('accountsChanged' as never, this._accountChanged);

            this._wallet = null;
            this._address = null;

            // this.emit('error', new WalletDisconnectedError());
            // this.emit('disconnect');
        }
    };

    private _accountChanged = async (newAddress?: string[]) => {
        const listener = window.metamask?.ethereum || window.ethereum!;
        const wallet = this._wallet || (listener as any).providerMap.get('MetaMask')!;
        if (!wallet) return;

        try {
            await wallet.request({ method: 'accountsChanged' }).then((accounts: any) => {
                if (accounts.length === 0) {
                    // MetaMask is locked or the user has not connected any accounts
                    console.log('Please connect to MetaMask.');
                } else if (accounts[0] !== this._address) {
                    this._address = accounts[0];
                    // Do any other work!
                }
            });
        } catch (error: any) {
            // this.emit('error', new WalletAddressError(error?.message, error));
        }

        // this.emit('connect', newAddress);
    };
}

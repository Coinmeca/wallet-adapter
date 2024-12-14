import EventEmitter from "eventemitter3";
import { Wallet, WalletAdapter } from './adapter';
// import type { MessageSignerWalletAdapter, SignerWalletAdapter, SignInMessageSignerWalletAdapter } from './signer';

export type Adapter =
    | Wallet
    | WalletAdapter
// | SignerWalletAdapter
// | MessageSignerWalletAdapter
// | SignInMessageSignerWalletAdapter;

export enum WalletAdapterNetwork {
    Mainnet = 'mainnet',
    Testnet = 'testnet',
    Devnet = 'devnet',
}

export interface Provider extends EventEmitter {
    providers?: any[];
    // isConnected(): boolean;
    request<T>(args: RequestArguments): Promise<T>;
};

export interface ProviderMessage {
    type: string;
    data: unknown;
}

export interface RequestArguments {
    id?: number;
    method: string;
    params?: unknown[] | object;
    success?: Function | Promise<any>;
    failure?: Function | Promise<any>;
}

export interface Transaction {
    nonce?: string; // '0x00' ignored by Coinbase
    gasPrice?: string; // '0x09184e72a000' customizable by user during Coinbase confirmation.
    gas?: string; // '0x2710' customizable by user during Coinbase confirmation.
    to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
    // from: string | any; // ethereum.selectedAddress // must match user's active address.
    value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
    data?: string;
    // '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
    chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by Coinbase.
    hardfork?: string;
    returnTransaction?: boolean;
    success?: Function | Promise<any>;
    failure?: Function | Promise<any>;
}

export type Callback<T> = (err: Error | null, result: T | null) => void;

export type JsonRpcMethod = 'eth_accounts' | 'eth_coinbase' | 'net_version' | 'eth_chainId' | 'eth_uninstallFilter' | 'eth_requestAccounts' | 'eth_sign' | 'eth_ecRecover' | 'personal_sign' | 'personal_ecRecover' | 'eth_signTransaction' | 'eth_sendRawTransaction' | 'eth_sendTransaction' | 'eth_signTypedData_v1' | 'eth_signTypedData_v2' | 'eth_signTypedData_v3' | 'eth_signTypedData_v4' | 'eth_signTypedData' | 'walletlink_arbitrary' | 'wallet_addEthereumChain' | 'wallet_switchEthereumChain' | 'wallet_watchAsset' | 'eth_subscribe' | 'eth_unsubscribe' | 'eth_newFilter' | 'eth_newBlockFilter' | 'eth_newPendingTransactionFilter' | 'eth_getFilterChanges' | 'eth_getFilterLogs';
export interface JsonRpcRequest<T = any> {
    jsonrpc: '2.0';
    id: number;
    method: string;
    params: T;
}
export interface JsonRpcResponse<T = any, U = any> {
    jsonrpc: '2.0';
    id: number;
    result?: T;
    error?: {
        code: number;
        message: string;
        data?: U;
    } | null;
}

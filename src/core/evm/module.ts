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
    isConnected(): boolean;
    request<T>(args: RequestArguments): Promise<T>;
};

export interface ProviderMessage {
    type: string;
    data: unknown;
}

export interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

export interface Transaction {
    nonce?: string; // '0x00' ignored by Coinbase
    gasPrice?: string; // '0x09184e72a000' customizable by user during Coinbase confirmation.
    gas?: string; // '0x2710' customizable by user during Coinbase confirmation.
    to?: string; // '0x0000000000000000000000000000000000000000' Required except during contract publications.
    from: string | any; // ethereum.selectedAddress // must match user's active address.
    value?: string; // '0x00' Only required to send ether to the recipient from the initiating external account.
    data?: string;
    // '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // Optional, but used for defining smart contract creation and interaction.
    chainId?: string; // '0x3' Used to prevent transaction reuse across blockchains. Auto-filled by Coinbase.
    hardfork?: string;
    returnTransaction?: boolean;
}

export type TransactionArgs = [undefined] | [Transaction] | [Function] | [Transaction, Function];
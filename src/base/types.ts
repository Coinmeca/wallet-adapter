import type { BaseWalletAdapter, WalletAdapter } from './adapter';
import type { MessageSignerWalletAdapter, SignerWalletAdapter, SignInMessageSignerWalletAdapter } from './signer';

export type Adapter =
    | BaseWalletAdapter
    | WalletAdapter
    | SignerWalletAdapter
    | MessageSignerWalletAdapter
    | SignInMessageSignerWalletAdapter;

export enum WalletAdapterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet',
}

export interface NativeCurrency {
    symbol: string;
    decimals: number;
}

export interface Chain {
    id: number;
    name: string;
    rpc: string[];
    nativeCurrency?: NativeCurrency;
    explorer?: string;
}

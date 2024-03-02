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

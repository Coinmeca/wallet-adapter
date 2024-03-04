import type { Wallet, WalletAdapter } from './adapter';
import type { Adapter as EvmWalletAdapter } from './evm/module';
import type { Adapter as SvmWalletAdapter } from './svm/module';

export type Adapter =
    | Wallet
    | WalletAdapter
    | EvmWalletAdapter
    | SvmWalletAdapter

export enum WalletAdapterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet',
}

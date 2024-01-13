import type { Transaction, TransactionVersion, VersionedTransaction } from 'base';
import type { WalletAdapter } from './adapter';
import type { MessageSignerWalletAdapter, SignerWalletAdapter } from './signer';

export type Adapter = WalletAdapter | SignerWalletAdapter | MessageSignerWalletAdapter;

export enum WalletAdapterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet'
}

export type SupportedTransactionVersions = ReadonlySet<TransactionVersion> | null | undefined;

export type TransactionOrVersionedTransaction<S extends SupportedTransactionVersions> = S extends null | undefined
    ? Transaction
    : Transaction | VersionedTransaction;

export function isVersionedTransaction(
    transaction: Transaction | VersionedTransaction
): transaction is VersionedTransaction {
    return 'version' in transaction;
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

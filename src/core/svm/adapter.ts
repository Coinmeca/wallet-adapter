import EventEmitter from 'eventemitter3';
import * as Core from 'core/adapter';
import { WalletError, WalletNotConnectedError } from 'core/errors';
import type { Connection, Account, Signer, SendOptions, Transaction, TransactionSignature, PublicKey, SendTransactionOptions } from './module';
import type { SupportedTransactionVersions, TransactionOrVersionedTransaction } from './transaction';

export { EventEmitter };

export interface WalletAdapterEvents extends Core.WalletAdapterEvents {
    connect(): void;
    disconnect(): void;
    error(error: WalletError): void;
}


export interface WalletAdapterProps<Name extends string = string> extends Omit<Core.WalletAdapterProps<Name>, 'sendTransaction'> {
    // url: string;
    // icon: string;
    // readyState: WalletReadyState;
    address: Account | Account[] | null;
    supportedTransactionVersions?: SupportedTransactionVersions;

    autoConnect(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(
        transaction: TransactionOrVersionedTransaction<this['supportedTransactionVersions']>,
        connection: Connection,
        options?: SendTransactionOptions
    ): Promise<TransactionSignature>;
}

export type Wallet<Name extends string = string> = WalletAdapterProps<Name> & EventEmitter<WalletAdapterEvents>;

export abstract class WalletAdapter<Name extends string = string> extends Core.WalletAdapter<Name> implements Wallet<Name>, EventEmitter<WalletAdapterEvents> {
    protected abstract accounts: Account[] | null;
    abstract supportedTransactionVersions?: SupportedTransactionVersions;

    abstract sendTransaction(
        transaction: TransactionOrVersionedTransaction<this['supportedTransactionVersions']>,
        connection: Connection,
        options: SendTransactionOptions
    ): Promise<TransactionSignature>

    async prepareTransaction(
        transaction: Transaction,
        connection: Connection,
        options: SendOptions = {}
    ): Promise<Transaction> {
        const accounts = this.accounts;
        if (!accounts) throw new WalletNotConnectedError();

        transaction.feePayer = transaction.feePayer as PublicKey;
        transaction.recentBlockhash =
            transaction.recentBlockhash ||
            (
                await connection.getLatestBlockhash({
                    commitment: options.preflightCommitment,
                    minContextSlot: options.minContextSlot,
                })
            ).blockhash;

        return transaction;
    }
}
import { Wallet, WalletAdapter, WalletAdapterProps } from './adapter';

export interface SignerWalletAdapterProps<Name extends string = string> extends Wallet<Name> {
    // signTransaction()
    // signAllTransactions()
}

export type SignerWalletAdapter<Name extends string = string> = WalletAdapter<Name> & SignerWalletAdapterProps<Name>;

export abstract class BaseSignerWalletAdapter<Name extends string = string>
    extends WalletAdapter<Name>
    implements SignerWalletAdapter<Name>
{
    async sendTransaction() { }

    async signTransaction() { }

    async signAllTransactions() { }
}

export interface MessageSignerWalletAdapterProps<Name extends string = string> extends WalletAdapterProps<Name> {
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export type MessageSignerWalletAdapter<Name extends string = string> = WalletAdapter<Name> &
    MessageSignerWalletAdapterProps<Name>;

export abstract class BaseMessageSignerWalletAdapter<Name extends string = string>
    extends BaseSignerWalletAdapter<Name>
    implements MessageSignerWalletAdapter<Name>
{
    abstract signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export interface SignInMessageSignerWalletAdapterProps<Name extends string = string> extends WalletAdapterProps<Name> {
    // signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput>;
}

export type SignInMessageSignerWalletAdapter<Name extends string = string> = WalletAdapter<Name> &
    SignInMessageSignerWalletAdapterProps<Name>;

export abstract class BaseSignInMessageSignerWalletAdapter<Name extends string = string>
    extends BaseMessageSignerWalletAdapter<Name>
    implements SignInMessageSignerWalletAdapter<Name>
{
    // abstract signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput>;
}
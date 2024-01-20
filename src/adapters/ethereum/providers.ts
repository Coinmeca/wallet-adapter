import { MetaMaskWalletAdapter, CoinbaseWalletAdapter } from 'providers';
import { Provider, Providers } from 'types';

export const providers: Providers = {
    MetaMask: <Provider>{
        name: "MetaMask",
        url: "https://metamask.io/",
        logo: "https://coinmeca-web3/wallets/MetaMask/logo.svg",
        adapter(url?: string) {
            return new MetaMaskWalletAdapter();
        }
    },
    CoinbaseWallet: <Provider>{
        name: "Coinbase Wallet",
        url: "https://www.coinbase.com/wallet",
        logo: "https://avatars.githubusercontent.com/u/18060234?s=280&v=4",
        adapter(url?: string) {
            return new CoinbaseWalletAdapter();
        }
    }
};

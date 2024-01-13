import { MetaMaskWalletAdapter, CoinbaseWalletAdapter } from 'providers';
import { Provider, Providers } from 'types';

export const providers: Providers = {
    "MetaMask": <Provider>{
        name: "MetaMask",
        url: "https://metamask.io/",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/120px-MetaMask_Fox.svg.png",
        adapter(url?: string) {
            return new MetaMaskWalletAdapter();
        }
    },
    "Coinbase Wallet": <Provider>{
        name: "Coinbase Wallet",
        url: "https://www.coinbase.com/wallet",
        logo: "https://avatars.githubusercontent.com/u/18060234?s=280&v=4",
        adapter(url?: string) {
            return new CoinbaseWalletAdapter();
        }
    }
};

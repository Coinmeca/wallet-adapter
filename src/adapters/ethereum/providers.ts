import { MetaMaskWalletAdapter, CoinbaseWalletAdapter, RainbowWalletAdapter } from "providers";
import { Provider, Providers } from "types";

export const providers: Providers = {
	MetaMask: <Provider>{
		name: "MetaMask",
		url: "https://metamask.io/",
		logo: "https://coinmeca-web3.vercel.app/wallets/MetaMask/logo.svg",
		adapter(url?: string) {
			return new MetaMaskWalletAdapter();
		},
	},
	CoinbaseWallet: <Provider>{
		name: "Coinbase Wallet",
		url: "https://www.coinbase.com/wallet",
		logo: "https://coinmeca-web3.vercel.app/wallets/CoinbaseWallet/logo.svg",
		adapter(url?: string) {
			return new CoinbaseWalletAdapter();
		},
	},
	Rainbow: <Provider>{
		name: "Rainbow",
		url: "https://rainbow.me",
		logo: "https://coinmeca-web3.vercel.app/wallets/Rainbow/logo.svg",
		adapter(url?: string) {
			return new RainbowWalletAdapter();
		},
	},
};

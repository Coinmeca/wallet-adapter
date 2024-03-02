import { Config } from "base/adapter";
import { Provider, Providers } from "types";
import { MetaMaskWalletAdapter, CoinbaseWalletAdapter, RainbowWalletAdapter } from "providers";

const detect = (wallet: string) => ((global || new (window as any)()) as any)?.ethereum?.providers?.find((p: any) => p[`${wallet}`]);

export const providers: Providers = {
	MetaMask: <Provider>{
		name: "MetaMask",
		url: "https://metamask.io/",
		logo: "https://coinmeca-web3.vercel.app/wallets/MetaMask/logo.svg",
		adapter: (config?: any) => (new MetaMaskWalletAdapter(config)),
	},
	CoinbaseWallet: <Provider>{
		name: "Coinbase Wallet",
		url: "https://www.coinbase.com/wallet",
		logo: "https://coinmeca-web3.vercel.app/wallets/CoinbaseWallet/logo.svg",
		adapter: (config?: any) => (new CoinbaseWalletAdapter(config)),
	},
	Rainbow: <Provider>{
		name: "Rainbow",
		url: "https://rainbow.me",
		logo: "https://coinmeca-web3.vercel.app/wallets/Rainbow/logo.svg",
		adapter: (config?: any) => new RainbowWalletAdapter(config),
	},
};

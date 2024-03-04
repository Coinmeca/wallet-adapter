import { Provider, Providers } from "types";
import { MetaMaskWalletAdapter, CoinbaseWalletAdapter, RainbowWalletAdapter, PhantomWalletAdapter } from "providers";

const detect = (wallet: string) => ((global || new (window as any)()) as any)?.ethereum?.providers?.find((p: any) => p[`${wallet}`]);

export const providers: Providers = {
	MetaMask: <Provider>{
		name: "MetaMask",
		logo: "https://coinmeca-web3.vercel.app/wallets/MetaMask/logo.svg",
		website: "https://metamask.io/",
		adapter: (config?: any) => (new MetaMaskWalletAdapter(config)),
	},
	CoinbaseWallet: <Provider>{
		name: "Coinbase Wallet",
		logo: "https://coinmeca-web3.vercel.app/wallets/CoinbaseWallet/logo.svg",
		website: "https://www.coinbase.com/wallet",
		adapter: (config?: any) => (new CoinbaseWalletAdapter(config)),
	},
	Rainbow: <Provider>{
		name: "Rainbow",
		logo: "https://coinmeca-web3.vercel.app/wallets/Rainbow/logo.svg",
		website: "https://rainbow.me",
		adapter: (config?: any) => new RainbowWalletAdapter(config),
	},
	Phantom: <Provider>{
		name: "Phantom",
		logo: "https://coinmeca-web3.vercel.app/wallets/Phantom/logo.svg",
		website: "https://phantom.app",
		adapter: (config?: any) => new PhantomWalletAdapter.evm(config),
	},
};

import { MetaMaskWalletAdapter, CoinbaseWalletAdapter, RainbowWalletAdapter } from "providers";
import { Provider, Providers } from "types";
import { isMobile } from "states";

const detect = (wallet: string) => ((global || new (window as any)()) as any)?.ethereum?.providers?.find((p: any) => p[`${wallet}`]);

export const providers: Providers = {
	...((detect('isMetaMask') || isMobile()) && {
		MetaMask: <Provider>{
			name: "MetaMask",
			url: "https://metamask.io/",
			logo: "https://coinmeca-web3.vercel.app/wallets/MetaMask/logo.svg",
			adapter(url?: string) {
				return new MetaMaskWalletAdapter();
			},
		}
	}),
	...((detect('isCoinbaseWallet') || isMobile()) && {
		CoinbaseWallet: <Provider>{
			name: "Coinbase Wallet",
			url: "https://www.coinbase.com/wallet",
			logo: "https://coinmeca-web3.vercel.app/wallets/CoinbaseWallet/logo.svg",
			adapter(url?: string) {
				return new CoinbaseWalletAdapter();
			},
		}
	}),
	...((detect('isRainbow') || isMobile()) && {
		Rainbow: <Provider>{
			name: "Rainbow",
			url: "https://rainbow.me",
			logo: "https://coinmeca-web3.vercel.app/wallets/Rainbow/logo.svg",
			adapter(url?: string) {
				return new RainbowWalletAdapter();
			},
		}
	}),
};

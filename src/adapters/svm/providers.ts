import {
	BitpieWalletAdapter,
	CloverWalletAdapter,
	Coin98WalletAdapter,
	CoinbaseWalletAdapter,
	CoinhubWalletAdapter,
	LedgerWalletAdapter,
	MathWalletAdapter,
	PhantomWalletAdapter,
	SafePalWalletAdapter,
	SolflareWalletAdapter,
	SolongWalletAdapter,
	TokenPocketWalletAdapter,
	TorusWalletAdapter,
	TrustWalletAdapter,
	WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Providers } from "types";

export const providers: Providers = {
	Phantom: {
		base: 'svm',
		name: 'Phantom',
		website: 'https://phantom.app',
		url: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
		// adapter: (config?) => new PhantomWalletAdapter.svm.Adapter();
		adapter: (config?) => new PhantomWalletAdapter(config) as any,
	},
	'Coinbase Wallet': {
		base: 'svm',
		name: 'Coinbase Wallet',
		website: 'https://www.coinbase.com/wallet',
		url: 'https://www.coinbase.com/wallet/downloads',
		// adapter: (config?) => new PhantomWalletAdapter.svm.Adapter();
		adapter: (config?) => new CoinbaseWalletAdapter(config) as any,
	},
	Solflare: {
		base: 'svm',
		name: 'Solflare',
		website: 'https://solflare.com',
		url: 'https://addons.mozilla.org/en-US/firefox/addon/solflare-wallet',
		adapter: (config?) => new SolflareWalletAdapter(config) as any,
	},
	Solong: {
		base: 'svm',
		name: 'Solong',
		website: 'https://solongwallet.com',
		url: 'https://chrome.google.com/webstore/detail/solong/memijejgibaodndkimcclfapfladdchj',
		adapter: (config?) => new SolongWalletAdapter(config) as any,
	},
	Coin98: {
		base: 'svm',
		name: 'Coin98',
		website: 'https://www.coin98.com',
		url: 'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg',
		adapter: (config?) => new Coin98WalletAdapter(config) as any,
	},
	Ledger: {
		base: 'svm',
		name: 'Ledger',
		website: 'https://www.ledger.com',
		adapter: (config?) => new LedgerWalletAdapter(config) as any,
	}
};

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
	Solflare: {
		name: 'Solflare',
		logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAw1BMVEVHcEz8TSr8Qi37Qyz9ZCT8Ryv9dx/9dB/8Tyn9ayL9cCD8SCv+nRT+iBr9cCD9ZyP+oRP+mxT9ciD8Sir9dh7+lhb7Py39YyT9byD8WSf8YyT9byH+lhb8XiX+jBn7Py79ciD9biH7RSz8XSX9byH+lhb+gBz+mhX9jBn9hBv9ixn9fh37QC37SSv8Tyr7Tir8ayL7RCz9dCD9jBn9ixn9ciD9ayL+jBn9dx7+lBf+nBT8Vyf9gBz+qRH8YyT9hhr/tA74ukugAAAANnRSTlMA9SWQDM8DCP4ZVTIyJeJHqFozmmZFR2y15KTucv3nYpKn44PIE4XytcOYPneftbvUUMvS0/YuiwXEAAABLklEQVQokX2Q57KCMBCFQw0gRZoKCvZ+ewkkgPj+T2VEnYFkhvMnZ/Ile3YXgLZc0KOh2ge3L+d5LIMkfDpn6bBQx7OHMTYGV9XEpwebBnxkmB3uxxitO9eqOaONBlkKgbpDMVsxHZrn37o8Bks04QYK95gqK3P0ZXF52wMmVUWyHMUyB60/XF2vJCtR1B0Rmu7uWFPY/Ewi5eNdehNHOjCH7p7QsLrMMCG4zi9FoWmC4otzEQAZWqE7O6V5Xtf3fgptPegmqsCbopwKJZoPuYb0DbpQ0ZI+363xj5J7mqKsvlnm2XbgxIXmiwNJYTJl2z7T0oJA7+Fc6sKfabOzSNCbp50lTOyH+RS4ncPF5PlWElgmjxf6045X3ITGi4GRwsJWjDxiYUui1ANhd/wbHrkf41CwpBwAAAAASUVORK5CYII=',
		website: 'https://solflare.com',
		url: 'https://addons.mozilla.org/en-US/firefox/addon/solflare-wallet',
		adapter: (config?) => new SolflareWalletAdapter(config) as any,
	},
	'Coinbase Wallet': {
		name: 'Coinbase Wallet',
		logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI4IDU2YzE1LjQ2NCAwIDI4LTEyLjUzNiAyOC0yOFM0My40NjQgMCAyOCAwIDAgMTIuNTM2IDAgMjhzMTIuNTM2IDI4IDI4IDI4WiIgZmlsbD0iIzFCNTNFNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNyAyOGMwIDExLjU5OCA5LjQwMiAyMSAyMSAyMXMyMS05LjQwMiAyMS0yMVMzOS41OTggNyAyOCA3IDcgMTYuNDAyIDcgMjhabTE3LjIzNC02Ljc2NmEzIDMgMCAwIDAtMyAzdjcuNTMzYTMgMyAwIDAgMCAzIDNoNy41MzNhMyAzIDAgMCAwIDMtM3YtNy41MzNhMyAzIDAgMCAwLTMtM2gtNy41MzNaIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
		website: 'https://www.coinbase.com/wallet',
		url: 'https://chromewebstore.google.com/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
		// adapter: (config?) => new PhantomWalletAdapter.svm.Adapter();
		adapter: (config?) => new CoinbaseWalletAdapter(config) as any,
	},
	'Trust Wallet': {
		name: 'Trust Wallet',
		logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAMAAACj+uTiAAAAilBMVEVHcEwEF/8FAP8FAP8GC/8OS/QFBP8FAP8AcP9D+ZkYtt1E+5cFA/8EG/8PhO4DEf8AWP9C95wAbP8x3bVF/JVG/pIBNP8BKv9G+5ZH/JVF+pYEAP8CU/4Ajv8BNf8BRP8Afv8CHP8CKf8AY/8ED/8bvdYSsOMz4bEr1L487aQKpO8jycoEmvoYZOMYbsxeAAAAG3RSTlMANI/yGAjLaP79kS+9UZnh349nkdB4tc2XhtYXSrr5AAAA8klEQVQokW3S23KDIBCAYVARbdSkOfSESlRSNej7v14XEAXT/875YJhxF6E1TIvbAb0U0Thkc5pefcQ0Zqp5HMc0/fk+EHM6gNOmue97jdcvuEnZ1jwMg8V3T0oppcWdPKAFL778Qhrl4Aufnk+DUr75UlUToNKHL3WlMriTO2Rw2kmSJBYLT9qu6ywWKHel7IwBnlF03KQpVUYxQpkjnPPFTvC7sSN1zbnRsxpDvIqoVcpOekLbJdFCGnMz0mCVpmk1fizDJtkmjcJPYveA2KeEUHiMnM1xSMQOuG+xjCC/fFkg+s8uBiELg+gV9EJi5+sP+CM42THdUC0AAAAASUVORK5CYII=',
		website: 'https://trustwallet.com/',
		url: 'https://chromewebstore.google.com/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
		adapter: (config?) => new TrustWalletAdapter(config) as any,
	},
	Phantom: {
		name: 'Phantom',
		logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAXVBMVEX18v/28//39P/59v/x7v759//b1frAt/Wrn/KmmfGonPK3rfTRyviqnvLl4PytovLLw/fOx/jW0Pm8svWpnPLFvPailfHf2fvv6/79+//r5/25rvTp5f2xpvPHv/d84nSZAAAA7UlEQVR4Aa2RBZbEIBAFoRsSPpOO+8j9j7kRGOPt0ymcwlE/Rf8niFkZsqRSmLLcAf6S2WQWFQIR55wg509ny8q7CGr+cA3EvYDRL8c5jk6BP5Jv6eU6f7qLztBx4/uBo7N52M4XzOPEM6SLkgu4E8mXdayX6SWpjG6benXSd7KNirJ6O+de7bdBzSm37V0CSlIb2sCl9DpM7FMXb8KVpBLrMVPf4qryKvrBnkdtfeg8V/B32apaxbMGV/jjOx7A3XxKwZxBBIM1RcbBKZqwL9bfmIaqm6zSRB+fBQyGthpz7H/ZeVVxoRSt1Y/5Ay2oD2Ds/EUpAAAAAElFTkSuQmCC",
		website: 'https://phantom.app',
		url: 'https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
		// adapter: (config?) => new PhantomWalletAdapter.svm.Adapter();
		adapter: (config?) => new PhantomWalletAdapter(config) as any,
	},
	Ledger: {
		name: 'Ledger',
		logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeklEQVR4Ae3XAQaAQBCF4QDdLOgwXSZAV1p0irnDQC8DhJod6YUXP6DxWdidYVpmanwAvoYsmaPxYaAj6ygG50sBegoJ4egbG7D/BiCAnxEAhrzy46vgKsAEEEAAAbiAaEXbtU8AdxXmUS8jvQcE4D/L6YsJfTXTdnwABbH42f7m8SUAAAAASUVORK5CYII=',
		website: 'https://www.ledger.com',
		adapter: (config?) => new LedgerWalletAdapter(config) as any,
	}
};

import {
    BitKeepWalletAdapter,
    BitpieWalletAdapter, CloverWalletAdapter,
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
    WalletConnectWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { Providers } from 'types';

export const providers: Providers = {
    // 'Sollet Web': {
    //     name: 'Sollet Web',
    //     website: 'https://www.sollet.io',
    //     url: 'https://www.sollet.io',
    //     adapter(url?: string) {
    //         return new SolletWalletAdapter({ provider: url });
    //     }
    // },
    // 'Sollet Extension': {
    //     name: 'Sollet Extension',
    //     website: 'https://www.sollet.io',
    //     url: 'https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno',
    //     adapter() {
    //         return new SolletWalletAdapter({ provider: (window as any).sollet });
    //     }
    // },
    Phantom: {
        name: 'Phantom',
        website: 'https://phantom.app',
        url: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
        adapter() {
            return new PhantomWalletAdapter();
            // getPhantomWallet();
            // return new PhantomWalletAdapter();
        }
    },
    SolflareExtension: {
        name: 'Solflare Extension',
        website: 'https://solflare.com',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/solflare-wallet',
        adapter() {
            return new SolflareWalletAdapter();
        }
    },
    Solong: {
        name: 'Solong',
        website: 'https://solongwallet.com',
        url: 'https://chrome.google.com/webstore/detail/solong/memijejgibaodndkimcclfapfladdchj',
        adapter() {
            return new SolongWalletAdapter();
        }
    },
    MathWallet: {
        name: 'MathWallet',
        website: 'https://mathwallet.org',
        url: 'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc',
        adapter() {
            // return new MathWalletWalletAdapter();
        }
    },
    Coin98: {
        name: 'Coin98',
        website: 'https://www.coin98.com',
        url: 'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg',
        adapter() {
            return new Coin98WalletAdapter();
        }
    }
    // Ledger: {
    //     website: 'https://www.ledger.com',
    //     adapter() {
    //         return new LedgerWalletAdapter({derivationPath: getDerivationPath()});
    //     }
    // }
};
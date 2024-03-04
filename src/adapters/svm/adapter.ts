import type { PublicKey } from '@solana/web3.js';
import { SvmBaseWalletAdapter } from 'base/adapter';
import { providers } from './providers';

export const adapter = {
    connect: async (name: string, auto?: boolean) => {
        const wallet = providers[name].adapter() as SvmBaseWalletAdapter;
        try {
            if (!wallet.address) {
                await wallet.connect();
                const publicKey: string = wallet.address.toBase58();
                if (wallet.connected && publicKey) {
                    // adapter.on('ready', onReady);
                    // adapter.on('connect', onConnect);
                    // adapter.on('disconnect', onDisconnect);
                    // adapter.on('error', onError);

                    // localStorage.setItem('walletName', JSON.stringify(name));
                    localStorage.setItem('wallet', wallet.name);
                    return {
                        provider: name,
                        publicKey: <PublicKey>wallet.address,
                        address: publicKey,
                        ...providers[name]
                    };
                }
            }
            // return () => {};
        } catch (error) {
            let msg = '';
            console.log('Wallet Connecting Error: \n', error);
            switch (error) {
                case 'WalletTimeoutError': {
                    msg = `Trying to connect wallet session was time out.`;
                    break;
                }
                case 'WalletWindowClosedError': {
                    msg = `Trying to connect wallet has been stopped by user.`;
                    break;
                }
                case 'WalletNotInstalledError': {
                    msg = `The ${wallet.name} is not installed yet.`;
                    break;
                }
                case 'WalletNotFoundError': {
                    msg = `Cannot find wallet information about ${wallet.name}.`;
                    break;
                }
                default: {
                    msg = 'An unknown error occurred while in connecting a wallet.';
                    break;
                }
            }
            return undefined;
        }
    },
    disconnect: async () => {
        const name = localStorage.getItem('wallet');

        if (!name) return;
        const wallet = providers[name].adapter() as SvmBaseWalletAdapter;

        try {
            if (wallet.address) {
                await wallet.disconnect();
                const publicKey = wallet.address;
                if (!publicKey && !wallet.connected) {
                    // localStorage.removeItem('walletName');
                    localStorage.removeItem('wallet');
                    wallet.disconnect();
                }
            }
        } catch (error) {
            let msg = ''
            console.log('Wallet Disconnecting Error: ', error);
            switch (error) {
                case 'WalletTimeoutError': {
                    msg = `Trying to disconnect wallet session was time out.`;
                    break;
                }
                case 'WalletWindowClosedError': {
                    msg = `Trying to disconnect wallet has been stopped by user.`;
                    break;
                }
                case 'WalletNotInstalledError': {
                    msg = `The ${wallet.name} is not installed yet.`;
                    break;
                }
                case 'WalletNotFoundError': {
                    msg = `Cannot find wallet information about ${wallet.name}.`;
                    break;
                }
                default: {
                    msg = 'An unknown error occurred while in disconnecting a wallet.';
                }
            }
            return undefined;
        }
    }
}

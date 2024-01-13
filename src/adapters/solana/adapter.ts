import type { PublicKey } from '@solana/web3.js';
import { providers } from './providers';

export function adapter() {

    async function Connect(name: string, auto?: boolean) {
        const wallet = providers[name].adapter(providers[name].url);
        try {
            if (!wallet.publicKey) {
                await wallet.connect();
                const publicKey: string = wallet.publicKey.toBase58();
                if (wallet.connected && publicKey) {
                    // adapter.on('ready', onReady);
                    // adapter.on('connect', onConnect);
                    // adapter.on('disconnect', onDisconnect);
                    // adapter.on('error', onError);

                    // localStorage.setItem('walletName', JSON.stringify(name));
                    localStorage.setItem('wallet', wallet.name);
                    return {
                        provider: name,
                        publicKey: <PublicKey>wallet.publicKey,
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
    }

    async function Disconnect() {
        const name = localStorage.getItem('wallet');

        if (!name) return;
        const wallet = providers[name].adapter(providers[name].url);

        try {
            if (wallet.publicKey) {
                await wallet.disconnect();
                const publicKey = wallet.publicKey;
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

    return { Connect, Disconnect };
}

import { getNetworksById } from 'chains';
import { providers } from './providers';

export const adapter = {
    connect: async (chainId: number, name: string, auto?: boolean) => {
        const wallet = providers[name].adapter(providers[name].url);
        try {
            // const provider = (window as any)[chain].providerMap.get(name);
            if (!wallet.connected || !wallet.address || wallet.address?.length === 0 || (wallet.address?.length > 0 && wallet.address[0])) {
                const chain = getNetworksById(chainId);
                await wallet.connect({
                    chainId: '0x' + chainId.toString(16),
                    chainName: chain?.name,
                    rpcUrls: chain?.rpc,
                    blockExplorerUrls: chain?.explorer,
                    nativeCurrency: chain?.nativeCurrency
                });
                if (wallet.connected && wallet.address[0]) {
                    localStorage.setItem('wallet', wallet.name);
                    return {
                        provider: wallet.name,
                        address: wallet.address[0],
                        chainId: chain?.id
                        // adapter
                    };
                }
            }
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
        const wallet = providers[name].adapter(providers[name].url);

        try {
            if (wallet.address) {
                await wallet.disconnect();
                if (!wallet.connected && !wallet.address) {
                    wallet.disconnect();
                    localStorage.removeItem('wallet');
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


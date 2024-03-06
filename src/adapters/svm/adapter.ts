import { WalletAdapter } from 'core/adapter';
import { type WalletStore, useWallet } from 'states';
import { Chain } from 'types';
import { providers } from './providers';

export const adapter = (config?: object) => {
    const { name, provider, chain, mount, unmount, update, connection } = useWallet();

    const connect = async (chain: number | string | Chain, name: string, auto?: boolean): Promise<WalletStore | void> => {
        const wallet = providers[name]?.adapter(config) as WalletAdapter;
        if (!wallet) console.error("Wallet Provider Not Found")
        if (wallet.connected && wallet.address) console.error("Wallet Already Connected");
        try {
            await wallet.connect(chain);
            const w: WalletStore = {
                name: name,
                address: wallet.address.toBase58(),
                // chain: c,
            };
            // adapter.on('ready', onReady);
            // adapter.on('connect', onConnect);
            // adapter.on('disconnect', onDisconnect);
            // adapter.on('error', onError);

            localStorage.setItem("wallet", JSON.stringify(w));
            update({ ...w, provider: wallet.provider });
            return w;
        } catch (error: any) {
            console.error("Wallet Connecting Error: ", error);
        }
    };

    const disconnect = async (): Promise<boolean> => {
        const wallet = (provider || providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config)) as WalletAdapter;
        if (!wallet) console.error("Wallet Provider Not Found");
        if (!wallet.connected || !wallet.address) console.error("Wallet Already Disconnected");
        try {
            await wallet.disconnect();

            localStorage.removeItem("wallet");
            unmount();
            return true;
        } catch (error) {
            console.error("Wallet Disconnecting Error: ", error);
            return false;
        }
    }

    return { connect, disconnect };
}

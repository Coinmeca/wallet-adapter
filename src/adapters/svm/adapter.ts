import { WalletAdapter } from 'core/adapter';
import { getNetworksById } from "chains";
import { useWallet, type WalletAction, type WalletStore } from "states";
import { parseChainId } from "utils";
import { Chain } from 'types';
import { providers } from './providers';

export const adapter = (config?: object): WalletAction => {
    const { name, provider, chain, mount, unmount, update, connection } = useWallet();

    const connect = async (chain: number | string | Chain, name: string, auto?: boolean): Promise<WalletStore | void> => {
        const wallet = providers[name]?.adapter(config) as WalletAdapter;
        chain = getNetworksById(parseChainId(chain)) as Chain;
        if (wallet.connected && (wallet as any).publicKey) console.error("Wallet Already Connected");
        // if (wallet.connected && wallet.address) console.error("Wallet Already Connected");
        if (!wallet) console.error("Wallet Provider Not Found")
        if (!wallet.provider) {
            window.open(providers[name].url, '_blank');
            console.error("Wallet Not Found");
        }
        try {
            await wallet.connect(chain);
            if (!wallet.connected || !(wallet as any).publicKey) console.error("Wallet Already Connected");
            // if (!wallet.connected || !wallet.address) console.error("Wallet Already Connected");
            const w: WalletStore = {
                name: name,
                address: (wallet as any).publicKey.toBase58(),
                // address: wallet.address.toBase58(),
                chain
            };
            // adapter.on('ready', onReady);
            // adapter.on('connect', onConnect);
            // adapter.on('disconnect', onDisconnect);
            // adapter.on('error', onError);

            localStorage.setItem("wallet", JSON.stringify(w));
            update({
                ...w,
                ...adapter(config),
                provider: wallet.provider
            }, chain);
            return w;
        } catch (error: any) {
            console.error("Wallet Connecting Error: ", error);
        }
    };

    const disconnect = async (): Promise<boolean> => {
        const wallet = (provider || providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config)) as WalletAdapter;
        if (!wallet) console.error("Wallet Provider Not Found");
        if (!wallet.connected || !(wallet as any).publicKey) console.error("Wallet Already Disconnected");
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

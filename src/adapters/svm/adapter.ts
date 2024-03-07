import { WalletAdapter } from 'core/adapter';
import { getNetworksById } from "chains";
import { useWallet, type WalletAction, type WalletStore, type ConnectArgs } from "states";
import { parseChainId } from "utils";
import { Chain } from 'types';
import { providers } from './providers';

export const adapter = (config?: object): WalletAction => {
    const { name, provider, chain, mount, unmount, update, connection } = useWallet();

    const actions = {
        // connect: async (chain: number | string | Chain, name?: string, auto?: boolean) => {
        connect: async (...args: ConnectArgs) => {
            const chain = args[0] ? getNetworksById(parseChainId(args[0])) : args[0] as Chain | undefined;
            const name = (args?.length > 1 && typeof args[1] === 'string') ? args[1] : undefined;
            const auto = (args?.length > 2 && typeof args[2] === 'boolean') ? args[2]
                : (args?.length > 1 && typeof args[1] === 'boolean') ? args[1] : undefined;

            const wallet = name ? providers[name]?.adapter(config) : provider;
            // chain = getNetworksById(parseChainId(chain)) as Chain;
            if (!wallet) console.error("Wallet Provider Not Found")
            if (!(name ? wallet?.provider : provider)) {
                window.open(providers[wallet.name].url, '_blank');
                console.error("Wallet Not Found");
            }
            try {
                await wallet.connect(chain);
                if (!wallet.connected || !(wallet as any).publicKey) console.error("Wallet Connection Error");
                // if (!wallet.connected || !wallet.address) console.error("Wallet Already Connected");
                const w: WalletStore = {
                    name: wallet.name,
                    address: (wallet as any).publicKey.toBase58(),
                    chain,
                    // address: wallet.address.toBase58(),
                };
                // adapter.on('ready', onReady);
                // adapter.on('connect', onConnect);
                wallet.on('disconnect', actions.disconnect);
                // adapter.on('error', onError);
                localStorage.setItem("wallet", JSON.stringify(w));
                update({
                    ...w,
                    ...actions,
                    provider: name ? wallet.provider : provider
                }, chain);
                return w;
            } catch (error: any) {
                console.error("Wallet Connecting Error: ", error);
                return undefined;
            }
        },
        disconnect: async () => {
            const wallet = (provider || providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config)) as WalletAdapter;
            if (!wallet) console.error("Wallet Provider Not Found");
            if (!wallet.connected || !(wallet as any).publicKey) console.error("Wallet Already Disconnected");
            try {
                await wallet.disconnect();
                wallet.off('disconnect', actions.disconnect);
                localStorage.removeItem("wallet");
                unmount();
                return true;
            } catch (error) {
                console.error("Wallet Disconnecting Error: ", error);
                return false;
            }
        },
        switchChain: async () => {
            return undefined
        }
    }

    return { ...actions };
}

import { WalletAdapter } from 'core/adapter';
import { getNetworksById } from "chains";
import { useWallet, type WalletAction, type WalletStore, type ConnectArgs } from "states";
import { parseChainId } from "utils";
import { Chain } from 'types';
import { providers } from './providers';

export const adapter = (config?: object): WalletAction => {
    const { name, provider, chain, mount, unmount, update, connection } = useWallet();

    const actions = {
        connect: async (...args: ConnectArgs) => {
            try {
                const c = args[0] ? getNetworksById(parseChainId(args[0])) : chain as Chain | undefined;
                const n = (args?.length > 1 && typeof args[1] === 'string') ? args[1] : undefined;
                const a = (args?.length > 2 && typeof args[2] === 'boolean') ? args[2]
                    : (args?.length > 1 && typeof args[1] === 'boolean') ? args[1] : undefined;

                const wallet = n ? providers[n]?.adapter(config) : provider;
                if (!wallet) throw new Error("Wallet Provider Not Found")
                // Todo
                // if (!(name ? wallet?.provider : provider)) {
                //     window.open(providers[wallet.name].url, '_blank');
                //     throw new Error("Wallet Not Found");
                // }

                await wallet.connect(c);
                if (!wallet.connected || (name ? wallet?.provider?.publicKey : wallet?.address)) throw new Error("Wallet Connection Error");
                const w: WalletStore = {
                    name: n,
                    chain: c,
                    address: (wallet as any).publicKey.toBase58(),
                    // address: wallet.address.toBase58(),
                };
                // Todo
                // wallet.on('ready', onReady);
                // wallet.on('connect', onConnect);
                // wallet.on('disconnect', actions.disconnect);
                // wallet.on('error', onError);
                localStorage.setItem("wallet", JSON.stringify(w));
                update({
                    ...w,
                    ...actions,
                    provider: name ? wallet.provider : provider
                }, c);
                return w;
            } catch (error: any) {
                throw new Error(`Wallet Connecting Error: ${error}`);
            }
        },
        disconnect: async () => {
            const wallet = (provider || providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config)) as WalletAdapter;
            if (!wallet) throw new Error("Wallet Provider Not Found");
            try {
                await wallet.disconnect();
                localStorage.removeItem("wallet");
                wallet.off("disconnect", actions.disconnect);
                unmount();
                return true;
            } catch (error) {
                throw new Error(`Wallet Disconnecting Error: ${error}`);
            }
        },
        switchChain: async () => {
            return undefined
        }
    }

    return { ...actions };
}

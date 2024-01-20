import { getNetworksById } from "chains";
import { providers } from "./providers";
import { useWallet, type WalletStore } from "states";

export const adapter = () => {
    const { info, connection, initialize } = useWallet();

    const connect = async (chainId: number, name: string, auto?: boolean): Promise<WalletStore | undefined> => {
        name = name.replaceAll(' ', '');
        const wallet = providers[name].adapter(providers[name].url);
        const chain = getNetworksById(chainId);
        const c = {
            chainId: "0x" + chainId.toString(16),
            ...(chain?.name && { chainName: chain?.name }),
            ...(chain?.rpc && { rpcUrls: chain?.rpc }),
            ...(chain?.explorer && { blockExplorerUrls: chain?.explorer }),
            ...(chain?.nativeCurrency && { nativeCurrency: chain?.nativeCurrency }),
        };
        try {
            if (!wallet.connected || !wallet.address || wallet.address?.length === 0 || (wallet.address?.length > 0 && wallet.address[0])) {
                await wallet.connect(c).then(() => {
                    if (wallet.connected && wallet.address[0]) {
                        const w: WalletStore = {
                            provider: wallet.name,
                            address: wallet.address[0],
                            chain,
                        };
                        connection(w);
                        localStorage.setItem("wallet", JSON.stringify(w));
                        return w;
                    }
                });
            }
        } catch (error) {
            let msg = "";
            console.log("Wallet Connecting Error: \n", error);
            switch (error) {
                case "WalletTimeoutError": {
                    msg = `Trying to connect wallet session was time out.`;
                    break;
                }
                case "WalletWindowClosedError": {
                    msg = `Trying to connect wallet has been stopped by user.`;
                    break;
                }
                case "WalletNotInstalledError": {
                    msg = `The ${wallet.name} is not installed yet.`;
                    break;
                }
                case "WalletNotFoundError": {
                    msg = `Cannot find wallet information about ${wallet.name}.`;
                    break;
                }
                default: {
                    msg = "An unknown error occurred while in connecting a wallet.";
                    break;
                }
            }
            return undefined;
        }
    };

    const disconnect = async (): Promise<boolean | undefined> => {
        const name = info?.provider || JSON.parse(localStorage.getItem("wallet") || '')?.name;

        if (!name) return;
        const wallet = providers[name].adapter(providers[name].url);

        try {
            const address = await wallet.request({ method: 'eth_accounts' })
            if (address) {
                if (!wallet.connected && address) {
                    await wallet.disconnect();
                    localStorage.removeItem("wallet");
                }
                initialize();
            }
            return true;
        } catch (error) {
            let msg = "";
            console.log("Wallet Disconnecting Error: ", error);
            switch (error) {
                case "WalletTimeoutError": {
                    msg = `Trying to disconnect wallet session was time out.`;
                    break;
                }
                case "WalletWindowClosedError": {
                    msg = `Trying to disconnect wallet has been stopped by user.`;
                    break;
                }
                case "WalletNotInstalledError": {
                    msg = `The ${wallet.name} is not installed yet.`;
                    break;
                }
                case "WalletNotFoundError": {
                    msg = `Cannot find wallet information about ${wallet.name}.`;
                    break;
                }
                default: {
                    msg = "An unknown error occurred while in disconnecting a wallet.";
                }
            }
            return false;
        }
    };

    return { connect, disconnect }
};

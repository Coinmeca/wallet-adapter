import { WalletAdapter } from "core/adapter";
import { getNetworksById } from "chains";
import { useWallet, type WalletAction, type WalletStore, type ConnectArgs } from "states";
import { parseChainId } from "utils";
import { Chain } from "types";
import { providers } from "./providers";

export const adapter = (config?: object): WalletAction => {
	const { name, provider, chain, mount, unmount, update, connection } = useWallet();

	const actions = {
		connect: async (...args: ConnectArgs) => {
			const chain = args[0] ? getNetworksById(parseChainId(args[0])) : args[0] as Chain | undefined;
			const name = (args?.length > 1 && typeof args[1] === 'string') ? args[1] : undefined;
			const auto = (args?.length > 2 && typeof args[2] === 'boolean') ? args[2]
				: (args?.length > 1 && typeof args[1] === 'boolean') ? args[1] : undefined;

			const wallet = name ? providers[name]?.adapter(config) : provider;
			if (!wallet) console.error("Wallet Provider Not Found")
			if (!(name ? wallet?.provider : provider)) {
				window.open(providers[wallet.name].url, '_blank');
				console.error("Wallet Not Found");
			}
			try {
				await wallet.connect(chain);
				if (!wallet.connected || !wallet.address) console.error("Wallet Connection Error");
				const w: WalletStore = {
					name: name,
					address: wallet.address,
					chain,
				};
				wallet.on("chainChanged", chainChanged);
				wallet.on("accountsChanged", accountsChanged);
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
			try {
				await wallet.disconnect();
				localStorage.removeItem("wallet");
				wallet.off("chainChanged", chainChanged);
				wallet.off("accountsChanged", accountsChanged);
				wallet.off("disconnect", actions.disconnect);
				unmount();
				return true;
			} catch (error) {
				console.error("Wallet Disconnecting Error: ", error);
				return false;
			}
		},
		switchChain: async (c: number | string | Chain) => {
			const wallet = (provider ? providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config) : provider) as WalletAdapter;
			if (!wallet) console.error("Wallet Provider Not Found")
			try {
				c = getNetworksById(parseChainId(c)) as Chain;
				if (c?.id !== chain?.id) {
					await wallet.chain(c);
					connection(c);
				}
				return c;
			} catch (error) {
				console.error("Wallet Chain Switching Error: ", error);
				return undefined;
			}
		}
	}

	const chainChanged = (chainId: string) => connection(getNetworksById(parseChainId(chainId)) || ({ id: parseChainId(chainId) } as Chain));
	const accountsChanged = (accounts: string | string[]) => update({ address: (Array.isArray(accounts) ? accounts[0] : accounts) as string });

	return { ...actions };
};

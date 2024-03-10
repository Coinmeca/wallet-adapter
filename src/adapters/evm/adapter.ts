import { WalletAdapter } from "core/adapter";
import * as adapters from 'adapters';
import { getNetworksById } from "chains";
import { useWallet, type WalletAction, type WalletStore, type ConnectArgs } from "states";
import { parseChainId } from "utils";
import { Chain } from "types";
import { providers } from "./providers";

export const adapter = (config?: object): WalletAction => {
	const { name, provider, chain, mount, unmount, update, connection } = useWallet();

	const actions = {
		connect: async (...args: ConnectArgs) => {
			const c = args[0] ? getNetworksById(parseChainId(args[0])) : chain as Chain | undefined;
			const n = (args?.length > 1 && typeof args[1] === 'string') ? args[1] : undefined;
			const a = (args?.length > 2 && typeof args[2] === 'boolean') ? args[2]
				: (args?.length > 1 && typeof args[1] === 'boolean') ? args[1] : undefined;

			const wallet = n ? providers[n]?.adapter(config) : provider;
			if (!wallet) throw new Error("Wallet Provider Not Found")
			// Todo
			// if (!(name ? wallet?.provider : provider)) {
			// 	window.open(providers[wallet.name].url, '_blank');
			// 	throw new Error("Wallet Not Found");
			// }

			try {
				await wallet.connect(c);
				if (!wallet?.connected || !wallet?.address) throw new Error("Wallet Connection Error");
				const w: WalletStore = {
					name: n,
					chain: c,
					address: wallet.address,
				};
				wallet.on("chainChanged", chainChanged);
				wallet.on("accountsChanged", accountsChanged);
				// wallet.on("disconnect", actions.disconnect);
				localStorage.setItem("wallet", JSON.stringify(w));
				update({
					...w,
					...actions,
					provider: n ? wallet.provider : provider
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
				wallet.off("chainChanged", chainChanged);
				wallet.off("accountsChanged", accountsChanged);
				wallet.off("disconnect", actions.disconnect);
				unmount();
				return true;
			} catch (error) {
				throw new Error(`Wallet Disconnecting Error: ${error}`);
			}
		},
		switchChain: async (c: number | string | Chain) => {
			c = (typeof c === 'object' ? c : getNetworksById(parseChainId(c))) || c;
			let wallet;
			if (typeof c === 'object' && c?.base && c?.base !== 'evm') {
				wallet = (adapters[c?.base].providers[name || JSON.parse(localStorage.getItem("wallet") || "")] || adapters[c?.base].providers[0]).adapter(config);
				if (!wallet) throw new Error("Wallet Provider Not Found");
				await wallet.connect();
			} else {
				wallet = (provider || providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config)) as WalletAdapter;
				if (!wallet) throw new Error("Wallet Provider Not Found");
				try {
					c = getNetworksById(parseChainId(c)) as Chain;
					if (c?.id !== chain?.id) {
						await wallet.chain(c);
						connection(c);
					}
					return c;
				} catch (error) {
					throw new Error(`Wallet Chain Switching Error: ${error}`);
				}
			}
		}
	}

	const chainChanged = (chainId: string) => connection(getNetworksById(parseChainId(chainId)) || ({ id: parseChainId(chainId) } as Chain));
	const accountsChanged = (accounts: string | string[]) => update({ address: (Array.isArray(accounts) ? accounts[0] : accounts) as string });

	return { ...actions };
};

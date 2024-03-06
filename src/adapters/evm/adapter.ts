import { WalletAdapter } from "core/adapter";
import { getNetworksById } from "chains";
import { useWallet, type WalletStore } from "states";
import { parseChainId } from "utils";
import { Chain } from "types";
import { providers } from "./providers";

export const adapter = (config?: object) => {
	const { name, provider, chain, mount, unmount, update, connection } = useWallet();

	const connect = async (chain: number | string | Chain, name: string, auto?: boolean): Promise<WalletStore | void> => {
		const wallet = providers[name]?.adapter(config) as WalletAdapter;
		const c: Chain | undefined = getNetworksById(parseChainId(chain));
		if (!wallet) console.error("Wallet Provider Not Found")
		if (wallet.connected && wallet.address) console.error("Wallet Already Connected");
		try {
			await wallet.connect(c);
			const w: WalletStore = {
				name: name,
				address: wallet.address,
				chain: c,
			};
			wallet.on("chainChanged", chainChanged);
			wallet.on("accountsChanged", accountsChanged);
			wallet.on("disconnect", disconnect);
			localStorage.setItem("wallet", JSON.stringify(w));
			update({ ...w, provider: wallet.provider }, c);
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
			wallet.off("chainChanged", chainChanged);
			wallet.off("accountsChanged", accountsChanged);
			wallet.off("disconnect", disconnect);
			unmount();
			return true;
		} catch (error) {
			console.error("Wallet Disconnecting Error: ", error);
			return false;
		}
	};

	const switchChain = async (c: number | string | Chain) => {
		const wallet = (provider ? providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config) : provider) as WalletAdapter;
		if (!wallet) console.error("Wallet Provider Not Found")
		if (!wallet.connected || !wallet.address) console.error("Wallet Already Disconnected");
		try {
			c = getNetworksById(parseChainId(c)) as Chain;
			if (c?.id !== chain?.id) {
				await wallet.chain(c);
				connection(c);
			}
		} catch (error) {
			console.error("Wallet Chain Switching Error: ", error);
			return false;
		}
	};

	const chainChanged = (chainId: string) => connection(getNetworksById(parseChainId(chainId)) || ({ id: parseChainId(chainId) } as Chain));
	const accountsChanged = (accounts: string | string[]) => update({ address: (Array.isArray(accounts) ? accounts[0] : accounts) as string });

	return { connect, disconnect, switchChain };
};

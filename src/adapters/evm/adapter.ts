import { WalletAdapter } from "core/adapter";
import { WalletLoadError, WalletNotReadyError } from "core/errors";
import { getNetworksById } from "chains";
import { useWallet, type WalletStore } from "states";
import { Chain } from "types";
import { providers } from "./providers";
import { parseChainId } from "../../utils";

export const adapter = (config?: object) => {
	const { name, provider, chain, mount, unmount, update, connection } = useWallet();

	const connect = async (chain: number | string | Chain, name?: string, auto?: boolean): Promise<WalletStore | void> => {
		name = name?.replaceAll(" ", "");
		const wallet: WalletAdapter = (name ? providers[name]?.adapter(config) : provider);
		const c: Chain | undefined = getNetworksById(parseChainId(chain));
		try {
			// if (!wallet.connected || !wallet.address || wallet.address?.length === 0 || (wallet.address?.length > 0 && !wallet.address[0])) throw new WalletNotReadyError();
			await wallet.connect(chain).then(() => {
				if (wallet.connected && wallet.address) {
					const w: WalletStore = {
						name: name,
						provider: wallet.provider,
						address: wallet.address,
						chain: c,
					};
					update(w, c);
					localStorage.setItem("wallet", JSON.stringify(w));
					wallet.on('chainChanged', (chainId: string) => connection(getNetworksById(parseChainId(chainId))));
					wallet.on('accountsChanged', (accounts: string | string[]) => update({ address: (Array.isArray(accounts) ? accounts[0] : accounts) as string }));
					wallet.on('disconnect', disconnect);
					return w;
				} else {
					console.error("Wallet Already Connected");
				}
			});
		} catch (error: any) {
			console.error("Wallet Connecting Error: ", error);
		}
	};

	const disconnect = async (): Promise<boolean> => {
		const wallet = (provider ? providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config) : provider) as WalletAdapter;

		try {
			if (wallet.connected || wallet.address) await wallet.disconnect();
			localStorage.removeItem("wallet");
			wallet.off('disconnect', disconnect);
			unmount();
			return true;
		} catch (error) {
			console.error("Wallet Disconnecting Error: ", error);
			return false;
		}
	};

	const switchChain = async (c: number | string | Chain) => {
		const wallet = (provider ? providers[name || JSON.parse(localStorage.getItem("wallet") || "")?.name]?.adapter(config) : provider) as WalletAdapter;

		try {
			c = getNetworksById(parseChainId(c)) as Chain;
			if (c?.id !== chain?.id) {
				await wallet.chain(c);
				connection(c);
			}
		} catch (error) {
			let msg = "";
			console.error("Wallet Chain Switching Error: ", error);
			return false;
		}
	};

	return { connect, disconnect, switchChain };
};

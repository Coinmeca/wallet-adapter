import { WalletAdapter } from "core/adapter";
import { getNetworksById } from "chains";
import { useWallet, type WalletStore } from "states";
import { Chain } from "types";
import { providers } from "./providers";

export const adapter = (config?: object) => {
	const { info, mount, unmount, update, connection } = useWallet();

	const connect = async (chainId: number, name: string, auto?: boolean): Promise<WalletStore | void> => {
		name = name?.replaceAll(" ", "");
		const wallet = providers[name]?.adapter(config) as WalletAdapter;
		const chain = getNetworksById(chainId);
		try {
			// if (!wallet.connected || !wallet.address || wallet.address?.length === 0 || (wallet.address?.length > 0 && !wallet.address[0])) {
			await wallet.connect(chain).then(() => {
				if (wallet.connected && wallet.address) {
					const w: WalletStore = {
						provider: wallet.name,
						address: wallet.address,
						chain,
					};
					update(w, chain);
					localStorage.setItem("wallet", JSON.stringify(w));
					wallet.on('disconnect', disconnect);
					return w;
				}
			});
			// }
		} catch (error: any) {
			let msg = "";
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

	const disconnect = async (): Promise<boolean> => {
		const name = info?.provider || JSON.parse(localStorage.getItem("wallet") || "")?.name;
		if (!name) return false;
		const wallet = providers[name].adapter(config);

		try {
			if (wallet.connected || wallet.address) await wallet.disconnect();
			localStorage.removeItem("wallet");
			wallet.off('disconnect');
			unmount();
			return true;
		} catch (error) {
			let msg = "";
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

	const switchChain = async (chain: number | string | Chain) => {
		const name = info?.provider || JSON.parse(localStorage.getItem("wallet") || "")?.name;
		if (!name) return false;
		const wallet = providers[name].adapter(providers[name].url);

		try {
			chain = (typeof chain === "number" ? getNetworksById(chain) : chain) as Chain;
			await wallet.chain(chain);
			connection(chain);
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

	return { connect, disconnect, switchChain };
};

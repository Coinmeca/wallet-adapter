import { getNetworksById } from "chains";
import { providers } from "./providers";
import { useWallet, type WalletStore } from "states";
import { Chain } from "../../types";
import { WalletConnectionError } from "../../base/errors";

export const adapter = () => {
	const { info, mount, unmount, update, connection } = useWallet();

	const connect = async (chainId: number, name: string, auto?: boolean): Promise<WalletStore | void> => {
		name = name?.replaceAll(" ", "");
		const wallet = providers[name]?.adapter(providers[name].url);
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
						update(w, chain);
						localStorage.setItem("wallet", JSON.stringify(w));
						return w;
					}
				});
			}
		} catch (error: any) {
			throw new WalletConnectionError(error?.message as string);
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
		const wallet = providers[name].adapter(providers[name].url);

		try {
			const address = (await wallet.getAddress())?.find((f: string) => f === info?.provider);
			if (!wallet.connected && address) await wallet.disconnect();
			localStorage.removeItem("wallet");
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

	const switchChain = async (chain: number | Chain) => {
		const name = info?.provider || JSON.parse(localStorage.getItem("wallet") || "")?.name;
		if (!name) return false;
		const wallet = providers[name].adapter(providers[name].url);

		try {
			chain = (typeof chain === "number" ? getNetworksById(chain) : chain) as Chain;
			await wallet.chain({
				chainId: "0x" + chain?.id?.toString(16),
				...(chain?.name && { chainName: chain?.name }),
				...(chain?.rpc && { rpcUrls: chain?.rpc }),
				...(chain?.explorer && { blockExplorerUrls: chain?.explorer }),
				...(chain?.nativeCurrency && { nativeCurrency: chain?.nativeCurrency }),
			});
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

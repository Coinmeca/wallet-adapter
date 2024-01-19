import { getNetworksById } from "chains";
import { providers } from "./providers";
import { useWallet } from "stores";

export const adapter = {
	connect: async (chainId: number, name: string, auto?: boolean) => {
		const { connection } = useWallet();
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
			// const provider = (window as any)[chain].providerMap.get(name);
			if (!wallet.connected || !wallet.address || wallet.address?.length === 0 || (wallet.address?.length > 0 && wallet.address[0])) {
				await wallet.connect(c).then(() => {
					if (wallet.connected && wallet.address[0]) {
						const w = {
							provider: wallet.name,
							address: wallet.address[0],
							chain: c,
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
	},
	disconnect: async () => {
		const { reset } = useWallet();
		const name = localStorage.getItem("wallet");

		if (!name) return;
		const wallet = providers[name].adapter(providers[name].url);

		try {
			if (wallet.address) {
				await wallet.disconnect();
				if (!wallet.connected && !wallet.address) {
					wallet.disconnect();
					localStorage.removeItem("wallet");
				}
				reset();
			}
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
			return undefined;
		}
	},
};

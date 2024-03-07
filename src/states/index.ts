import { create } from "zustand";
import { Chain } from "types";

export type ConnectArgs =
    | [undefined]
    | [undefined, undefined]
    | [undefined, undefined, undefined]
    | [undefined, boolean]
    | [number, boolean]
    | [string, boolean]
    | [Chain, boolean]
    | [number, string]
    | [string, string]
    | [Chain, string]
    | [number, undefined, boolean]
    | [string, undefined, boolean]
    | [Chain, undefined, boolean]
    | [number, string, boolean]
    | [string, string, boolean]
    | [Chain, string, boolean]

export interface Wallet {
    name?: string;
    provider?: any;
    address?: string;
}

export interface WalletStore extends Wallet {
    chain?: Chain;
}
export interface WalletAction {
    connect: (...args: ConnectArgs) => Promise<WalletStore | undefined>;
    disconnect: () => Promise<boolean>;
    switchChain: (c: number | string | Chain) => Promise<Chain | undefined>;
}
export interface WalletStoreAction extends WalletAction {
    mount: (wallet: WalletStore) => void;
    unmount: () => void;
    update: (wallet: Wallet, chain?: Chain) => void;
    connection: (chain?: Chain) => void;
    initialize: () => void;
}

const initial: WalletStore & WalletAction = {
    name: undefined,
    provider: undefined,
    address: undefined,
    chain: undefined,
    connect: async () => { console.error('Provider Not Found'); return undefined },
    disconnect: async () => { console.error('Provider Not Found'); return false },
    switchChain: async () => { console.error('Provider Not Found'); return undefined },
};

export const useWallet = create<WalletStore & WalletStoreAction>((set) => ({
    ...initial,
    mount: (wallet: WalletStore) => set((state: WalletStore & WalletStoreAction) => ({ ...wallet })),
    update: (wallet: Wallet, chain?: Chain) => set((state: WalletStore & WalletStoreAction) => ({ ...wallet, chain })),
    unmount: () => set(({ chain }: WalletStore & WalletStoreAction) => ({ ...initial, chain })),
    connection: (chain?: Chain) => set((state: WalletStore & WalletStoreAction) => ({ ...state, chain })),
    initialize: () => set(() => ({ ...initial })),
}));

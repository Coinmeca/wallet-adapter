import { create } from "zustand";
import { Chain } from "types";

const initial: WalletStore = {
    info: undefined,
    provider: undefined,
    address: undefined,
    chain: undefined,
};

export interface Wallet {
    provider?: string;
    address?: string;
}

export interface WalletStore extends Wallet {
    info?: Wallet;
    chain?: Chain;
}

export interface WalletStoreAction {
    connection: (wallet: WalletStore) => void;
    initialize: () => void;
}

export const useWallet = create<WalletStore & WalletStoreAction>((set) => ({
    ...initial,
    connection: (wallet: WalletStore) => set(() => ({ info: wallet, ...wallet })),
    initialize: () => set((state: WalletStore & WalletStoreAction) => ({ ...state, ...initial })),
}));

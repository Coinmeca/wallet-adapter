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
    mount: (wallet: WalletStore) => void;
    unmount: () => void;
    update: (wallet: Wallet, chain?: Chain) => void;
    connection: (chain: Chain) => void;
    initialize: () => void;
}

export const useWallet = create<WalletStore & WalletStoreAction>((set) => ({
    ...initial,
    mount: (wallet: WalletStore) => set((state: WalletStore & WalletStoreAction) => ({ ...state, ...wallet, info: wallet, })),
    update: (wallet: Wallet, chain?: Chain) => set((state: WalletStore & WalletStoreAction) => ({ ...state, info: wallet, provider: wallet.provider, address: wallet.address, ...(chain && chain) })),
    unmount: () => set((state: WalletStore & WalletStoreAction) => ({ ...state, info: initial.info, provider: initial.provider, address: initial.address })),
    connection: (chain: Chain) => set((state: WalletStore & WalletStoreAction) => ({ ...state, chain })),
    initialize: () => set((state: WalletStore & WalletStoreAction) => ({ ...state, ...initial })),
}));

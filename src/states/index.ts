import { create } from "zustand";
import { Chain } from "types";

const initial: WalletStore = {
    name: undefined,
    provider: undefined,
    address: undefined,
    chain: undefined,
    connect: undefined,
    disconnect: undefined,
    switchChain: undefined,
};

export interface Wallet {
    name?: string;
    provider?: any;
    address?: string;
}

export interface WalletStore extends Wallet {
    chain?: Chain;
}

export interface WalletAction {
    connect?: (chain: number | string | Chain, name: string, auto?: boolean) => Promise<WalletStore | void>;
    disconnect?: () => Promise<boolean>;
    switchChain?: (c: number | string | Chain) => Promise<Chain | undefined>;
}
export interface WalletStoreAction extends WalletAction {
    mount: (wallet: WalletStore) => void;
    unmount: () => void;
    update: (wallet: Wallet, chain?: Chain) => void;
    connection: (chain?: Chain) => void;
    initialize: () => void;
}

export const useWallet = create<WalletStore & WalletStoreAction>((set) => ({
    ...initial,
    mount: (wallet: WalletStore) => set((state: WalletStore & WalletStoreAction) => ({ ...wallet })),
    update: (wallet: Wallet, chain?: Chain) => set((state: WalletStore & WalletStoreAction) => ({ ...wallet, chain })),
    unmount: () => set(({ chain }: WalletStore & WalletStoreAction) => ({ ...initial, chain })),
    connection: (chain?: Chain) => set((state: WalletStore & WalletStoreAction) => ({ ...state, chain })),
    initialize: () => set(() => ({ ...initial })),
}));
import { create } from 'zustand';
import { Chain } from 'types';

export interface WalletInfo {
    provider: string;
    address: string[] | string;
}

export interface Wallet extends WalletInfo {
    chain?: Chain;
}

export interface WalletStore extends Wallet {
    info: WalletInfo;
    connection: Function;
}

export const useWalletStore = create((set) => ({
    info: undefined,
    provider: undefined,
    address: undefined,
    chain: undefined,
    connection: (_new?: WalletStore) => set(() => (_new ? { ..._new, info: { provider: _new?.provider, address: _new?.address } } : {})),
    initialize: () => set(() => ({}))
}));

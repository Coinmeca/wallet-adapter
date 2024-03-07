import { Adapter } from "core/types";

export interface NativeCurrency {
    symbol: string;
    decimals: number;
}

export interface Asset {
    type?: string,
    address?: string;
    symbol?: string;
    decimals?: string | number;
    image?: string;
}

export type ChainBase = 'evm' | 'svm'

export interface Chain {
    id: number;
    name: string;
    base: ChainBase;
    rpc: string[];
    nativeCurrency?: NativeCurrency;
    explorer?: string[];
}

export interface Chains {
    [key: string]: Chain;
}

export interface Providers {
    [key: string]: Provider;
}

export interface Provider {
    name: string;
    logo?: string;
    website?: string;
    url?: string;
    adapter: (config?: any) => Adapter;
}

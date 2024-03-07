import { Cluster } from "@solana/web3.js";
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
    base: ChainBase;
    name: string;
    logo?: string;
    type?: string | Cluster;
    rpc: string[];
    explorer?: string[];
    nativeCurrency?: NativeCurrency;
}

export interface Chains {
    [key: string]: {
        mainnet?: Chain;
        testnet?: {
            [key: string]: Chain | undefined;
        }
        devnet?: {
            [key: string]: Chain | undefined;
        }
    };
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

export interface NativeCurrency {
    symbol: string;
    decimals: number;
}

export interface Chain {
    id: number;
    name: string;
    rpc: string[];
    nativeCurrency?: NativeCurrency;
    explorer?: string[];
}

export interface Chains {
    [key as string]: Chain;
}

export interface Providers {
    [key: string]: Provider;
}
export interface Provider {
    name?: string;
    logo?: string;
    website: string;
    url: string;
    adapter?: any;
}

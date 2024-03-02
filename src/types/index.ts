
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

export interface Chain {
    id: number;
    name: string;
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
    name?: string;
    logo?: string;
    website: string;
    url: string;
    adapter?: any;
}

export interface Adapter {
    connect: (chainId: number, name: string, auto?: boolean) => Promise<void>
}
import { Chain } from "../types";

export function parseChainId(chain: number | string | Chain): number {
    return typeof chain === 'string'
        ? (chain.startsWith('0x')
            ? Number(chain)
            : parseInt(chain))
        : typeof chain === 'number'
            ? chain
            : parseChainId(chain?.id);
}

export function formatChainId(chain: number | string | Chain): string {
    return typeof chain === 'string' ?
        (chain.startsWith('0x')
            ? chain
            : formatChainId(parseInt(chain)))
        : typeof chain === 'number'
            ? `0x${chain?.toString(16)}`
            : formatChainId(chain?.id);
}
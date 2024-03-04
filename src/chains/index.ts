import type { Chains, Chain } from 'types';
import type { Cluster } from '@solana/web3.js';

export const chainlist: any = {
    ethereum: {
        mainnet: <Chain>{
            id: 1,
            name: 'Ethereum',
            rpc: [
                // "Safe" URLs
                'https://api.mycryptoapi.com/eth',
                'https://cloudflare-eth.com',
                // "Fallback" URLs
                'https://rpc.ankr.com/eth',
                'https://eth-mainnet.public.blastapi.io'
            ],
            nativeCurrency: {
                "symbol": "ETH",
                "decimals": 18
            }
        },
        devnet: {
            ropsten: <Chain>{
                id: 3,
                name: 'Ropsten',
                rpc: ['https://rpc.ankr.com/eth_ropsten'],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            rinkeby: <Chain>{
                id: 4,
                name: 'Rinkeby',
                rpc: ['https://rinkeby-light.eth.linkpool.io/'],
                logo: 'https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg'
            },
            goerli: <Chain>{
                id: 5,
                name: 'Goerli',
                rpc: ['https://rpc.goerli.mudit.blog/', 'https://rpc.ankr.com/eth_goerli'],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            kovan: <Chain>{
                id: 42,
                name: 'Kovan',
                rpc: [
                    // "Safe" URLs
                    'https://kovan.poa.network',
                    // "Fallback" URLs
                    'https://eth-kovan.public.blastapi.io'
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            }
        }
    },
    arbitrum: {
        mainnet: <Chain>{
            id: 42161,
            name: 'Arbitrum One',
            rpc: [
                // "Safe" URLs
                'https://arbitrum-mainnet.infura.io',
                'https://arb1.arbitrum.io/rpc',
                // "Fallback" URLs
                'https://arbitrum.public-rpc.com'
            ],
            logo: 'https://l2beat.com/icons/arbitrum.png'
        },
        testnet: {
            goerli: {
                id: 421613,
                name: "Arbitrum Goerli",
                rpc: [
                    "wss://arbitrum-goerli.publicnode.com",
                    "https://api.zan.top/node/v1/arb/goerli/public",
                    "https://goerli-rollup.arbitrum.io/rpc",
                    "https://arbitrum-goerli.blockpi.network/v1/rpc/public",
                    "https://rpc.goerli.arbitrum.gateway.fm",
                    "https://arbitrum-goerli.public.blastapi.io",
                    "https://arbitrum-goerli.publicnode.com",
                    "https://endpoints.omniatech.io/v1/arbitrum/goerli/public"
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            sepolia: {
                id: 421614,
                name: "Arbitrum Sepolia Testnet",
                rpc: ["https://sepolia-rollup.arbitrum.io/rpc", "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"],
                explorer: ["https://sepolia.arbiscan.io/"],
                nativeCurrency: {
                    symbol: 'ETH',
                    decimals: 18
                },
            },
            runkeby: <Chain>{
                id: 421611,
                name: 'Arbitrum Rinkeby',
                rpc: [
                    // "Safe" URLs
                    'https://rinkeby.arbitrum.io/rpc'
                ],
                logo: 'https://l2beat.com/icons/arbitrum.png'
            },
            testnet: <Chain>{
                id: 421613,
                name: 'Arbitrum Testnet',
                rpc: [
                    // "Safe" URLs
                    'https://goerli-rollup.arbitrum.io/rpc'
                ],
                explorer: ['https://goerli.arbiscan.io/'],
                logo: 'https://l2beat.com/icons/arbitrum.png'
            }
        }
    },
    optimism: {
        mainnet: <Chain>{
            id: 10,
            name: 'Optimism',
            rpc: [
                // "Safe" URLs
                'https://mainnet.optimism.io/',
                // "Fallback" URLs
                'https://rpc.ankr.com/optimism',
                'https://optimism-mainnet.infura.io'
            ]
        },
        devnet: {
            goerli: <Chain>{
                id: 420,
                name: 'Optimism Goerli',
                rpc: [
                    // "Safe" URLs
                    'https://goerli.optimism.io'
                ]
            }
        }
    },
    polygon: {
        mainnet: <Chain>{
            id: 137,
            name: 'Polygon',
            rpc: [
                // "Safe" URLs
                'https://polygon-rpc.com/',
                'https://rpc-mainnet.matic.network',
                'https://matic-mainnet.chainstacklabs.com',
                'https://rpc-mainnet.maticvigil.com',
                'https://rpc-mainnet.matic.quiknode.pro',
                'https://matic-mainnet-full-rpc.bwarelabs.com'
            ],
            logo: 'https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp',
            nativeCurrency: {
                symbol: 'MATIC',
                decimals: 18
            },
        },
        testnet: {
            mumbai: <Chain>{
                id: 80001,
                name: 'Polygon Mumbai',
                rpc: [
                    // "Safe" URLs
                    "https://rpc.ankr.com/polygon_mumbai",
                    "https://polygon-mumbai-bor.publicnode.com",
                    "https://polygon-mumbai.blockpi.network/v1/rpc/public",
                    "https://rpc-mumbai.maticvigil.com",
                    "https://polygon-mumbai.g.alchemy.com/v2/demo",
                    "https://gateway.tenderly.co/public/polygon-mumbai",
                    "https://polygon-mumbai.gateway.tenderly.co",
                    "https://polygon-testnet.public.blastapi.io    ",
                    "https://endpoints.omniatech.io/v1/matic/mumbai/public",
                ],
                nativeCurrency: {
                    symbol: 'MATIC',
                    decimals: 18
                },
                explorer: ['https://mumbai.polygonscan.com/'],
                logo: 'https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp'
            },
        },
        localnet: <Chain>{
            id: 999999,
            name: 'Polygon Localnet',
            rpc: ['127.0.0.1:3000']
        }
    },
    polygon_zkevm: {
        mainnet: <Chain>{
            id: 1101,
            name: 'Polygon zkEVM',
            rpc: [
                // "Safe" URLs
                'https://zkevm-rpc.com'
            ],
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEx7P+R7P+R7P+R7P+R7P+V7P+R7PuR7P+R7P+R7P+Z7P+R7P+Wom7PeAAAADXRSTlMAH7P/o22SP+3LFX5Vbg7mjAAAALBJREFUeAFjIBYwKhsJoAg4GxubIPODjR3YjE0R/ArjiQwMK43bITwwEyI8C8JnM7aGaUwA05NNGE7vXgDEDM6WID6PsQCrsbEBCDMaHwAKsJgycJrsMAdhhmAHoACTDQOnOQQyHFZAEwiGCvBshECGyVABGFhkDBYwdTaGAYgAgmsSDBHQgmmB2mIJNxQqYIrhDmQBDKdjeA7q/Wq49zEDCDMIMQMZEQ3oEYUZlUQCAHdePrGmeAqLAAAAAElFTkSuQmCC'
        },
        testnet: {
            testnet: <Chain>{
                id: 1442,
                name: 'Polygon zkEVM Testnet',
                rpc: ['https://rpc.public.zkevm-test.net'],
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEx7P+R7P+R7P+R7P+R7P+V7P+R7PuR7P+R7P+R7P+Z7P+R7P+Wom7PeAAAADXRSTlMAH7P/o22SP+3LFX5Vbg7mjAAAALBJREFUeAFjIBYwKhsJoAg4GxubIPODjR3YjE0R/ArjiQwMK43bITwwEyI8C8JnM7aGaUwA05NNGE7vXgDEDM6WID6PsQCrsbEBCDMaHwAKsJgycJrsMAdhhmAHoACTDQOnOQQyHFZAEwiGCvBshECGyVABGFhkDBYwdTaGAYgAgmsSDBHQgmmB2mIJNxQqYIrhDmQBDKdjeA7q/Wq49zEDCDMIMQMZEQ3oEYUZlUQCAHdePrGmeAqLAAAAAElFTkSuQmCC'
            }
        }
    },
    celo: {
        mainnet: <Chain>{
            id: 42220,
            name: 'Celo',
            rpc: [
                // "Safe" URLs
                `https://forno.celo.org`
            ]
        },
        testnet: {
            alfajores: <Chain>{
                id: 44787,
                name: 'Celo Alfajores',
                rpc: [
                    // "Safe" URLs
                    `https://alfajores-forno.celo-testnet.org`
                ],
                logo: 'https://stakingcrypto.info/static/assets/coins/celo-logo.png'
            }
        }
    },
    bsc: {
        mainnet: <Chain>{
            id: 56,
            name: 'BNB Chain',
            rpc: ['https://bsc-dataseed.binance.org/']
        }
    },
    avalanche: {
        mainnet: {
            id: 43114,
            name: 'Avalanche C-chain',
            rpc: ['https://avalanche-mainnet.infura.io'],
            logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png'
        },
        testnet: {
            fuji: <Chain>{
                id: 43113,
                name: 'Avalanche Fuji',
                rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
                logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
                explorer: ['https://testnet.snowtrace.io/']
            }
        }
    },
    solana: {
        mainnet: <Chain>{
            id: 101,
            name: 'Solana',
            type: <Cluster>'mainnet-beta',
            rpc: ['https://api.mainnet-beta.solana.com'],
            logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png'
        },
        testnet: {
            testnet: <Chain>{
                id: 102,
                name: 'Solana Testnet',
                type: <Cluster>'testnet',
                rpc: [''],
                logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png'
            }
        },
        devnet: {
            devnet: <Chain>{
                id: 103,
                name: 'Solana Devnet',
                type: <Cluster>'devnet',
                rpc: ['https://api.devnet.solana.com/'],
                logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png'
            }
        }
    }
};

export function getChainByName(name: string, type: 'mainnet' | 'testnet' | 'devnet') {
    const result = Object.keys(chainlist).filter((chain: string) => {
        const c = chainlist[chain][type];
        switch (type) {
            case 'mainnet': {
                if (typeof c === 'object') {
                    return Object.values(c).find((c: any) => c.name === name);
                } else if (c?.name == name) {
                    return c;
                }
                break;
            }
            default: {
                if (c)
                    return Object.values(c).find((net: any) => {
                        if (net.name === name) {
                            return net;
                        }
                    });
            }
        }
    });
    return result[0] || '';
}

export function getChainNames(type: 'mainnet' | 'testnet' | 'devnet') {
    return Object.keys(chainlist)
        .filter((c: string) => {
            if (chainlist[c][type]) return c;
        })
        .map((c: string) => {
            return c?.split(' ')?.map((v: string) => [...v]?.map((n: string, i: number) => i === 0 ? n?.toUpperCase() : n).join(''));
        }).flatMap((f) => f);
}

export function getNetworkByName(name: string) {
    return Object.values([(Object.values(chainlist) as any)?.flatMap((chains: any) => chains).map((types: any) => Object.values(types as any)).flatMap((networks: any) => networks)?.flatMap((c: any) => c), ...(Object.values(chainlist) as any)?.flatMap((chains: any) => chains).map((types: any) => Object.values(types as any)).flatMap((networks: any) => networks)?.flatMap((c: any) => Object.values(c).flatMap((c) => c))]).find((f) => f?.name === name);
}

export function getNetworksById(id: number) {
    return Object.values([(Object.values(chainlist) as any)?.flatMap((chains: any) => chains).map((types: any) => Object.values(types as any)).flatMap((networks: any) => networks)?.flatMap((c: any) => c), ...(Object.values(chainlist) as any)?.flatMap((chains: any) => chains).map((types: any) => Object.values(types as any)).flatMap((networks: any) => networks)?.flatMap((c: any) => Object.values(c).flatMap((c) => c))]).find((f) => f?.id === id);
}

export function getNetworks(type: 'mainnet' | 'testnet' | 'devnet') {
    return Object.values(chainlist)
        .flatMap((c: any) => {
            if (c[type]) return Object.values(c[type]);
        })
        .filter((c: any) => {
            if (c) return c;
        });
}
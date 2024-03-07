import type { Chains, Chain } from 'types';
import type { Cluster } from '@solana/web3.js';

export const chainlist: any = {
    ethereum: {
        mainnet: <Chain>{
            id: 1,
            name: 'Ethereum',
            logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
            rpc: [
                "https://ethereum.publicnode.com",
                "https://virginia.rpc.blxrbdn.com",
                "https://uk.rpc.blxrbdn.com",
                "https://singapore.rpc.blxrbdn.com",
                "https://rpc.ankr.com/eth",
                "https://mainnet.gateway.tenderly.co",
                "https://gateway.tenderly.co/public/mainnet",
                "https://1rpc.io/eth",
                "https://endpoints.omniatech.io/v1/eth/mainnet/public",
                "wss://mainnet.gateway.tenderly.co"
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
                logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
                rpc: ['https://rpc.ankr.com/eth_ropsten'],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            rinkeby: <Chain>{
                id: 4,
                name: 'Rinkeby',
                logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
                rpc: [
                    'https://rinkeby-light.eth.linkpool.io/'
                ],
            },
            goerli: <Chain>{
                id: 5,
                name: 'Goerli',
                logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
                rpc: [
                    'https://rpc.goerli.mudit.blog/',
                    'https://rpc.ankr.com/eth_goerli'
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            kovan: <Chain>{
                id: 42,
                name: 'Kovan',
                logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
                rpc: [
                    'https://kovan.poa.network',
                    'https://eth-kovan.public.blastapi.io'
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            }
        }
    },
    optimism: {
        mainnet: <Chain>{
            id: 10,
            name: 'Optimism',
            logo: 'https://coinmeca-web3.vercel.app/10/logo.svg',
            rpc: [
                "https://optimism.llamarpc.com",
                "https://optimism.blockpi.network/v1/rpc/public",
                "https://optimism.drpc.org",
                "https://optimism-mainnet.public.blastapi.io",
                "https://rpc.optimism.gateway.fm",
                "https://mainnet.optimism.io",
                "https://optimism.meowrpc.com",
                "https://rpc.tornadoeth.cash/optimism",
                "https://optimism-rpc.publicnode.com",
                "https://rpc.ankr.com/optimism",
                "https://op-pokt.nodies.app",
                "https://api.zan.top/node/v1/opt/mainnet/public",
                "https://optimism.gateway.tenderly.co",
                "https://gateway.tenderly.co/public/optimism",
                "https://endpoints.omniatech.io/v1/op/mainnet/public",
                "wss://optimism-rpc.publicnode.com",
                "wss://optimism.gateway.tenderly.co"
            ]
        },
        devnet: {
            goerli: <Chain>{
                id: 420,
                name: 'Optimism Goerli',
                logo: 'https://coinmeca-web3.vercel.app/10/logo.svg',
                rpc: [
                    'https://goerli.optimism.io'
                ]
            }
        }
    },
    bnb: {
        mainnet: <Chain>{
            id: 56,
            name: 'BNB Smart Chain',
            logo: 'https://coinmeca-web3.vercel.app/56/logo.svg',
            rpc: [
                "https://binance.llamarpc.com",
                "https://rpc.ankr.com/bsc",
                "https://1rpc.io/bnb",
                "https://bsc-dataseed1.ninicoin.io",
                "https://bscrpc.com",
                "https://bsc-dataseed4.bnbchain.org",
                "https://bsc.rpc.blxrbdn.com",
                "https://bsc-dataseed3.defibit.io",
                "https://bsc-dataseed.bnbchain.org",
                "https://bsc-dataseed2.defibit.io",
                "https://bsc-dataseed2.bnbchain.org",
                "https://binance.nodereal.io",
                "https://bsc.publicnode.com",
                "https://koge-rpc-bsc.48.club",
                "https://bsc.meowrpc.com",
                "https://rpc-bsc.48.club",
                "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
                "https://bsc-mainnet.public.blastapi.io",
                "https://bsc-dataseed3.bnbchain.org",
                "https://bsc-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
                "https://bsc-dataseed1.defibit.io",
                "https://bsc-dataseed4.ninicoin.io",
                "https://bsc-dataseed1.bnbchain.org",
                "https://bsc.blockpi.network/v1/rpc/public",
                "https://bsc-dataseed4.defibit.io",
                "https://api.zan.top/node/v1/bsc/mainnet/public",
                "https://bsc-dataseed3.ninicoin.io",
                "https://bsc-pokt.nodies.app",
                "https://bsc-dataseed2.ninicoin.io",
                "https://endpoints.omniatech.io/v1/bsc/mainnet/public",
                "wss://bsc.publicnode.com"
            ]
        }
    },
    polygon: {
        mainnet: <Chain>{
            id: 137,
            name: 'Polygon',
            logo: 'https://coinmeca-web3.vercel.app/137/logo.svg',
            rpc: [
                "https://polygon-rpc.com",
                "https://polygon-pokt.nodies.app",
                "https://rpc.ankr.com/polygon",
                "https://polygon.blockpi.network/v1/rpc/public",
                "https://polygon.rpc.blxrbdn.com",
                "https://rpc-mainnet.matic.quiknode.pro",
                "https://polygon-mainnet.public.blastapi.io",
                "https://polygon-bor.publicnode.com",
                "https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
                "https://gateway.tenderly.co/public/polygon",
                "https://polygon.gateway.tenderly.co",
                "https://polygon.meowrpc.com",
                "wss://polygon-bor.publicnode.com"
            ],
            nativeCurrency: {
                symbol: 'MATIC',
                decimals: 18
            },
        },
        testnet: {
            mumbai: <Chain>{
                id: 80001,
                name: 'Polygon Mumbai',
                logo: 'https://coinmeca-web3.vercel.app/137/logo.svg',
                rpc: [
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
            },
        },
    },
    polygon_zkevm: {
        mainnet: <Chain>{
            id: 1101,
            name: 'Polygon zkEVM',
            logo: 'https://coinmeca-web3.vercel.app/137/logo.svg',
            rpc: [
                'https://zkevm-rpc.com'
            ],
        },
        testnet: {
            testnet: <Chain>{
                id: 1442,
                name: 'Polygon zkEVM Testnet',
                rpc: [
                    'https://rpc.public.zkevm-test.net'
                ],
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEx7P+R7P+R7P+R7P+R7P+V7P+R7PuR7P+R7P+R7P+Z7P+R7P+Wom7PeAAAADXRSTlMAH7P/o22SP+3LFX5Vbg7mjAAAALBJREFUeAFjIBYwKhsJoAg4GxubIPODjR3YjE0R/ArjiQwMK43bITwwEyI8C8JnM7aGaUwA05NNGE7vXgDEDM6WID6PsQCrsbEBCDMaHwAKsJgycJrsMAdhhmAHoACTDQOnOQQyHFZAEwiGCvBshECGyVABGFhkDBYwdTaGAYgAgmsSDBHQgmmB2mIJNxQqYIrhDmQBDKdjeA7q/Wq49zEDCDMIMQMZEQ3oEYUZlUQCAHdePrGmeAqLAAAAAElFTkSuQmCC'
            }
        }
    },
    base: {
        mainnet: {
            id: 8453,
            name: "Base",
            logo: 'https://coinmeca-web3.vercel.app/8453/logo.svg',
            rpc: [
                "wss://base.publicnode.com",
                "wss://base.gateway.tenderly.co",
                "https://base.llamarpc.com",
                "https://base-pokt.nodies.app",
                "https://base.blockpi.network/v1/rpc/public",
                "https://base.gateway.tenderly.co",
                "https://gateway.tenderly.co/public/base",
                "https://base-mainnet.public.blastapi.io",
                "https://rpc.notadegen.com/base",
                "https://base.publicnode.com",
                "https://endpoints.omniatech.io/v1/base/mainnet/public",
                "https://developer-access-mainnet.base.org",
                "https://mainnet.base.org",
                "https://base.meowrpc.com"
            ],
            nativeCurrency: {
                symbol: "ETH",
                decimals: 18
            }
        }
    },
    arbitrum: {
        mainnet: <Chain>{
            id: 42161,
            name: 'Arbitrum One',
            logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
            rpc: [
                "https://rpc.arb1.arbitrum.gateway.fm",
                "https://endpoints.omniatech.io/v1/arbitrum/one/public",
                "https://arbitrum-one.public.blastapi.io",
                "wss://arbitrum-one.publicnode.com"
            ],
        },
        testnet: {
            goerli: {
                id: 421613,
                name: "Arbitrum Goerli",
                logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
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
                logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
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
                logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
                rpc: [
                    'https://rinkeby.arbitrum.io/rpc'
                ],
            }
        }
    },
    celo: {
        mainnet: <Chain>{
            id: 42220,
            name: 'Celo',
            rpc: [
                'https://forno.celo.org'
            ]
        },
        testnet: {
            alfajores: <Chain>{
                id: 44787,
                name: 'Celo Alfajores',
                rpc: [
                    'https://alfajores-forno.celo-testnet.org'
                ],
                logo: 'https://stakingcrypto.info/static/assets/coins/celo-logo.png'
            }
        }
    },
    avalanche: {
        mainnet: {
            id: 43114,
            name: 'Avalanche C-chain',
            logo: 'https://coinmeca-web3.vercel.app/43114/logo.svg',
            rpc: ['https://avalanche-mainnet.infura.io'],
        },
        testnet: {
            fuji: <Chain>{
                id: 43113,
                name: 'Avalanche Fuji',
                logo: 'https://coinmeca-web3.vercel.app/43114/logo.svg',
                rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
                explorer: ['https://testnet.snowtrace.io/']
            }
        }
    },
    berachain: {
        testnet: {
            artio: {
                id: 80085,
                name: "Berachain Artio",
                logo: 'https://coinmeca-web3.vercel.app/80085/logo.svg',
                rpc: ["https://artio.rpc.berachain.com/"],
                explorer: ["https://artio.beratrail.io/"],
                nativeCurrency: {
                    symbol: "BERA",
                    decimals: 18
                }
            }
        }
    },
    solana: {
        mainnet: <Chain>{
            id: 101,
            name: 'Solana',
            type: <Cluster>'mainnet-beta',
            logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
            rpc: ['https://api.mainnet-beta.solana.com'],
        },
        testnet: {
            testnet: <Chain>{
                id: 102,
                name: 'Solana Testnet',
                type: <Cluster>'testnet',
                logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
                rpc: [''],
            }
        },
        devnet: {
            devnet: <Chain>{
                id: 103,
                name: 'Solana Devnet',
                type: <Cluster>'devnet',
                logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
                rpc: ['https://api.devnet.solana.com/'],
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
    return name ? [
        ...(Object.values(chainlist))?.flatMap((c) => c)
            .map((c: any) => Object.values(c)).flatMap((c) => c).flatMap((c) => c),
        ...(Object.values(chainlist))?.flatMap((c) => c)
            .map((c: any) => Object.values(c)).flatMap((c) => c).flatMap((c) => c).map((c: any) => Object.values(c)).flatMap((c) => c).flatMap((c) => c)
    ].find((f: any) => f?.name === name) as Chain : undefined;
}

export function getNetworksById(id: number): Chain | undefined {
    return id ? [
        ...(Object.values(chainlist))?.flatMap((c) => c)
            .map((c: any) => Object.values(c)).flatMap((c) => c).flatMap((c) => c),
        ...(Object.values(chainlist))?.flatMap((c) => c)
            .map((c: any) => Object.values(c)).flatMap((c) => c).flatMap((c) => c).map((c: any) => Object.values(c)).flatMap((c) => c).flatMap((c) => c)
    ].find((c: any) => c?.id === id) as Chain : undefined;
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
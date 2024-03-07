import type { Chains, Chain, ChainType } from 'types';

export const chainlist: Chains = {
    ethereum: {
        mainnet: {
            id: 1,
            base: 'evm',
            name: 'Ethereum',
            logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
            rpc: [
                "https://mainnet.infura.io/v3/",
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
            ropsten: {
                id: 3,
                base: 'evm',
                name: 'Ropsten',
                logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
                rpc: ['https://rpc.ankr.com/eth_ropsten'],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            rinkeby: {
                id: 4,
                base: 'evm',
                name: 'Rinkeby',
                logo: 'https://coinmeca-web3.vercel.app/1/logo.svg',
                rpc: [
                    'https://rinkeby-light.eth.linkpool.io/'
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            goerli: {
                id: 5,
                name: 'Goerli',
                base: 'evm',
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
            kovan: {
                id: 42,
                base: 'evm',
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
        mainnet: {
            id: 10,
            base: 'evm',
            name: 'Optimism',
            logo: 'https://coinmeca-web3.vercel.app/10/logo.svg',
            rpc: [
                "https://optimism-mainnet.infura.io",
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
            ],
            nativeCurrency: {
                "symbol": "ETH",
                "decimals": 18
            }
        },
        testnet: {
            goerli: {
                id: 420,
                base: 'evm',
                name: 'Optimism Goerli',
                logo: 'https://coinmeca-web3.vercel.app/10/logo.svg',
                rpc: [
                    'https://goerli.optimism.io'
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            sepolia: {
                id: 420,
                base: 'evm',
                name: 'Optimism Sepolia',
                logo: 'https://coinmeca-web3.vercel.app/10/logo.svg',
                rpc: [
                    'https://sepolia.optimism.io'
                ],
                explorer: [
                    'https://sepolia-optimistic.etherscan.io'
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            }
        },
    },
    bsc: {
        mainnet: {
            id: 56,
            base: 'evm',
            name: 'BNB Smart Chain',
            logo: 'https://coinmeca-web3.vercel.app/56/logo.svg',
            rpc: [
                "https://bsc-dataseed.binance.org/",
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
            ],
            nativeCurrency: {
                symbol: 'BNB',
                decimals: 18
            },
        }
    },
    polygon: {
        mainnet: {
            id: 137,
            base: 'evm',
            name: 'Polygon',
            logo: 'https://coinmeca-web3.vercel.app/137/logo.svg',
            rpc: [
                "https://polygon-mainnet.infura.io",
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
            mumbai: {
                id: 80001,
                base: 'evm',
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
                explorer: ['https://mumbai.polygonscan.com/'],
                nativeCurrency: {
                    symbol: 'MATIC',
                    decimals: 18
                },
            },
        },
    },
    polygon_zkevm: {
        mainnet: {
            id: 1101,
            base: 'evm',
            name: 'Polygon zkEVM',
            logo: 'https://coinmeca-web3.vercel.app/137/logo.svg',
            rpc: [
                'https://zkevm-rpc.com'
            ],
            nativeCurrency: {
                symbol: 'MATIC',
                decimals: 18
            },
        },
        testnet: {
            testnet: {
                id: 1442,
                base: 'evm',
                name: 'Polygon zkEVM Testnet',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEx7P+R7P+R7P+R7P+R7P+V7P+R7PuR7P+R7P+R7P+Z7P+R7P+Wom7PeAAAADXRSTlMAH7P/o22SP+3LFX5Vbg7mjAAAALBJREFUeAFjIBYwKhsJoAg4GxubIPODjR3YjE0R/ArjiQwMK43bITwwEyI8C8JnM7aGaUwA05NNGE7vXgDEDM6WID6PsQCrsbEBCDMaHwAKsJgycJrsMAdhhmAHoACTDQOnOQQyHFZAEwiGCvBshECGyVABGFhkDBYwdTaGAYgAgmsSDBHQgmmB2mIJNxQqYIrhDmQBDKdjeA7q/Wq49zEDCDMIMQMZEQ3oEYUZlUQCAHdePrGmeAqLAAAAAElFTkSuQmCC',
                rpc: [
                    'https://rpc.public.zkevm-test.net'
                ],
                nativeCurrency: {
                    symbol: 'MATIC',
                    decimals: 18
                },
            }
        }
    },
    base: {
        mainnet: {
            id: 8453,
            base: 'evm',
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
        mainnet: {
            id: 42161,
            base: 'evm',
            name: 'Arbitrum One',
            logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
            rpc: [
                "https://arbitrum-mainnet.infura.io",
                "https://rpc.arb1.arbitrum.gateway.fm",
                "https://endpoints.omniatech.io/v1/arbitrum/one/public",
                "https://arbitrum-one.public.blastapi.io",
                "wss://arbitrum-one.publicnode.com"
            ],
            nativeCurrency: {
                symbol: 'ETH',
                decimals: 18
            },
        },
        testnet: {
            goerli: {
                id: 421613,
                base: 'evm',
                name: "Arbitrum Goerli",
                logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
                rpc: [
                    "https://api.zan.top/node/v1/arb/goerli/public",
                    "https://goerli-rollup.arbitrum.io/rpc",
                    "https://arbitrum-goerli.blockpi.network/v1/rpc/public",
                    "https://rpc.goerli.arbitrum.gateway.fm",
                    "https://arbitrum-goerli.public.blastapi.io",
                    "https://arbitrum-goerli.publicnode.com",
                    "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
                    "wss://arbitrum-goerli.publicnode.com",
                ],
                nativeCurrency: {
                    "symbol": "ETH",
                    "decimals": 18
                }
            },
            sepolia: {
                id: 421614,
                base: 'evm',
                name: "Arbitrum Sepolia",
                logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
                rpc: [
                    "https://sepolia-rollup.arbitrum.io/rpc",
                    "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"
                ],
                explorer: ["https://sepolia.arbiscan.io/"],
                nativeCurrency: {
                    symbol: 'ETH',
                    decimals: 18
                },
            },
            runkeby: {
                id: 421611,
                base: 'evm',
                name: 'Arbitrum Rinkeby',
                logo: 'https://coinmeca-web3.vercel.app/42161/logo.svg',
                rpc: [
                    'https://rinkeby.arbitrum.io/rpc'
                ],
                nativeCurrency: {
                    symbol: 'ETH',
                    decimals: 18
                },
            }
        }
    },
    celo: {
        mainnet: {
            id: 42220,
            base: 'evm',
            name: 'Celo',
            logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDI1MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkNGRjUyO30KCS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7fQo8L3N0eWxlPgo8ZyBpZD0iTGF5ZXJfeDAwMjBfMSI+Cgk8ZyBpZD0iXzE5NDI3OTI1NDQ3MzYiPgoJCTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjEyNTAiIGN5PSIxMjUwIiByPSIxMjUwIj48L2NpcmNsZT4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTk0OS4zLDU0Ni4ySDU1MC43djE0MDcuN2gxMzk4Ljd2LTQ5MS40aC0yMzIuMWMtODAsMTc5LjMtMjYwLjEsMzA0LjEtNDY2LjIsMzA0LjEgICAgYy0yODQuMSwwLTUxNC4yLTIzMy42LTUxNC4yLTUxNy41YzAtMjg0LDIzMC4xLTUxNS42LDUxNC4yLTUxNS42YzIxMC4xLDAsMzkwLjIsMTI4LjksNDcwLjIsMzEyLjFoMjI4LjFWNTQ2LjJ6Ij48L3BhdGg+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==',
            rpc: [
                'https://forno.celo.org'
            ],
            nativeCurrency: {
                symbol: 'CELO',
                decimals: 18
            },
        },
        testnet: {
            alfajores: {
                id: 44787,
                base: 'evm',
                name: 'Celo Alfajores',
                logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDI1MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkNGRjUyO30KCS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7fQo8L3N0eWxlPgo8ZyBpZD0iTGF5ZXJfeDAwMjBfMSI+Cgk8ZyBpZD0iXzE5NDI3OTI1NDQ3MzYiPgoJCTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjEyNTAiIGN5PSIxMjUwIiByPSIxMjUwIj48L2NpcmNsZT4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTk0OS4zLDU0Ni4ySDU1MC43djE0MDcuN2gxMzk4Ljd2LTQ5MS40aC0yMzIuMWMtODAsMTc5LjMtMjYwLjEsMzA0LjEtNDY2LjIsMzA0LjEgICAgYy0yODQuMSwwLTUxNC4yLTIzMy42LTUxNC4yLTUxNy41YzAtMjg0LDIzMC4xLTUxNS42LDUxNC4yLTUxNS42YzIxMC4xLDAsMzkwLjIsMTI4LjksNDcwLjIsMzEyLjFoMjI4LjFWNTQ2LjJ6Ij48L3BhdGg+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==',
                rpc: [
                    'https://alfajores-forno.celo-testnet.org'
                ],
                nativeCurrency: {
                    symbol: 'CELO',
                    decimals: 18
                },
            },
        }
    },
    avalanche: {
        mainnet: {
            id: 43114,
            base: 'evm',
            name: 'Avalanche C-chain',
            logo: 'https://coinmeca-web3.vercel.app/43114/logo.svg',
            rpc: [
                'https://avalanche-mainnet.infura.io',
                "https://avalanche.public-rpc.com",
                "https://rpc.ankr.com/avalanche",
                "https://avalanche.blockpi.network/v1/rpc/public",
                "https://api.avax.network/ext/bc/C/rpc",
                "https://endpoints.omniatech.io/v1/avax/mainnet/public",
                "https://avax-pokt.nodies.app/ext/bc/C/rpc",
                "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
                "https://1rpc.io/avax/c",
                "https://avalanche-c-chain.publicnode.com",
                "https://avax.meowrpc.com",
                "https://avalanche.api.onfinality.io/public/ext/bc/C/rpc",
                "wss://avalanche-c-chain.publicnode.com"
            ],
            nativeCurrency: {
                symbol: 'AVAX',
                decimals: 18
            },
        },
        testnet: {
            fuji: {
                id: 43113,
                base: 'evm',
                name: 'Avalanche Fuji',
                logo: 'https://coinmeca-web3.vercel.app/43114/logo.svg',
                rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
                explorer: [
                    'https://testnet.snowtrace.io/'
                ],
                nativeCurrency: {
                    symbol: 'AVAX',
                    decimals: 18
                },
            }
        }
    },
    berachain: {
        testnet: {
            artio: {
                id: 80085,
                base: 'evm',
                name: "Berachain Artio",
                logo: 'https://coinmeca-web3.vercel.app/80085/logo.svg',
                rpc: [
                    "https://artio.rpc.berachain.com/"
                ],
                explorer: [
                    "https://artio.beratrail.io/"
                ],
                nativeCurrency: {
                    symbol: "BERA",
                    decimals: 18
                }
            }
        }
    },
    zora: {
        mainnet: {
            id: 7777777,
            base: 'evm',
            name: 'Zora',
            logo: '',
            rpc: ['https://rpc.zora.energy'],
            explorer: ['https://explorer.zora.energy/'],
            nativeCurrency: {
                symbol: 'ETH',
                decimals: 18
            }
        }
    },
    solana: {
        mainnet: {
            id: 101,
            name: 'Solana',
            base: 'svm',
            type: 'mainnet-beta',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjI5OF8yOTUpIj4KPHBhdGggZD0iTTE1OC43ODEgMzE2LjI3OEMxNjAuNTE5IDMxNC41NCAxNjIuOTA5IDMxMy41MjYgMTY1LjQ0MyAzMTMuNTI2SDM5NS4yOTNDMzk5LjQ5MyAzMTMuNTI2IDQwMS41OTMgMzE4LjU5NiAzOTguNjI0IDMyMS41NjVMMzUzLjIxOSAzNjYuOTdDMzUxLjQ4MSAzNjguNzA4IDM0OS4wOTEgMzY5LjcyMSAzNDYuNTU3IDM2OS43MjFIMTE2LjcwN0MxMTIuNTA3IDM2OS43MjEgMTEwLjQwNyAzNjQuNjUyIDExMy4zNzYgMzYxLjY4M0wxNTguNzgxIDMxNi4yNzhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0xNTguNzgxIDE0Ni43NTJDMTYwLjU5MSAxNDUuMDE0IDE2Mi45ODEgMTQ0IDE2NS40NDMgMTQ0SDM5NS4yOTNDMzk5LjQ5MyAxNDQgNDAxLjU5MyAxNDkuMDY5IDM5OC42MjQgMTUyLjAzOEwzNTMuMjE5IDE5Ny40NDNDMzUxLjQ4MSAxOTkuMTgxIDM0OS4wOTEgMjAwLjE5NSAzNDYuNTU3IDIwMC4xOTVIMTE2LjcwN0MxMTIuNTA3IDIwMC4xOTUgMTEwLjQwNyAxOTUuMTI2IDExMy4zNzYgMTkyLjE1N0wxNTguNzgxIDE0Ni43NTJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0zNTMuMjE5IDIzMC45NzNDMzUxLjQ4MSAyMjkuMjM1IDM0OS4wOTEgMjI4LjIyMSAzNDYuNTU3IDIyOC4yMjFIMTE2LjcwN0MxMTIuNTA3IDIyOC4yMjEgMTEwLjQwNyAyMzMuMjkgMTEzLjM3NiAyMzYuMjU5TDE1OC43ODEgMjgxLjY2NEMxNjAuNTE5IDI4My40MDIgMTYyLjkwOSAyODQuNDE2IDE2NS40NDMgMjg0LjQxNkgzOTUuMjkzQzM5OS40OTMgMjg0LjQxNiA0MDEuNTkzIDI3OS4zNDcgMzk4LjYyNCAyNzYuMzc4TDM1My4yMTkgMjMwLjk3M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yMjk4XzI5NSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzIyOThfMjk1IiB4MT0iMzczLjMzNiIgeTE9IjExNi44NzYiIHgyPSIyMTQuMjYxIiB5Mj0iNDIxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjI5OF8yOTUiIHgxPSIzMDMuNzgiIHkxPSI4MC41NjIyIiB4Mj0iMTQ0LjcwNSIgeTI9IjM4NS4yNTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZBMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEQzFGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIyOThfMjk1IiB4MT0iMzM4LjMzNiIgeTE9Ijk4LjYwNDEiIHgyPSIxNzkuMjYyIiB5Mj0iNDAzLjI5NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIyOThfMjk1Ij4KPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMjUuNzIyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyIDE0NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
            rpc: [
                'https://api.mainnet-beta.solana.com'
            ],
        },
        testnet: {
            testnet: {
                id: 102,
                name: 'Solana Testnet',
                base: 'svm',
                type: 'testnet',
                logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjI5OF8yOTUpIj4KPHBhdGggZD0iTTE1OC43ODEgMzE2LjI3OEMxNjAuNTE5IDMxNC41NCAxNjIuOTA5IDMxMy41MjYgMTY1LjQ0MyAzMTMuNTI2SDM5NS4yOTNDMzk5LjQ5MyAzMTMuNTI2IDQwMS41OTMgMzE4LjU5NiAzOTguNjI0IDMyMS41NjVMMzUzLjIxOSAzNjYuOTdDMzUxLjQ4MSAzNjguNzA4IDM0OS4wOTEgMzY5LjcyMSAzNDYuNTU3IDM2OS43MjFIMTE2LjcwN0MxMTIuNTA3IDM2OS43MjEgMTEwLjQwNyAzNjQuNjUyIDExMy4zNzYgMzYxLjY4M0wxNTguNzgxIDMxNi4yNzhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0xNTguNzgxIDE0Ni43NTJDMTYwLjU5MSAxNDUuMDE0IDE2Mi45ODEgMTQ0IDE2NS40NDMgMTQ0SDM5NS4yOTNDMzk5LjQ5MyAxNDQgNDAxLjU5MyAxNDkuMDY5IDM5OC42MjQgMTUyLjAzOEwzNTMuMjE5IDE5Ny40NDNDMzUxLjQ4MSAxOTkuMTgxIDM0OS4wOTEgMjAwLjE5NSAzNDYuNTU3IDIwMC4xOTVIMTE2LjcwN0MxMTIuNTA3IDIwMC4xOTUgMTEwLjQwNyAxOTUuMTI2IDExMy4zNzYgMTkyLjE1N0wxNTguNzgxIDE0Ni43NTJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0zNTMuMjE5IDIzMC45NzNDMzUxLjQ4MSAyMjkuMjM1IDM0OS4wOTEgMjI4LjIyMSAzNDYuNTU3IDIyOC4yMjFIMTE2LjcwN0MxMTIuNTA3IDIyOC4yMjEgMTEwLjQwNyAyMzMuMjkgMTEzLjM3NiAyMzYuMjU5TDE1OC43ODEgMjgxLjY2NEMxNjAuNTE5IDI4My40MDIgMTYyLjkwOSAyODQuNDE2IDE2NS40NDMgMjg0LjQxNkgzOTUuMjkzQzM5OS40OTMgMjg0LjQxNiA0MDEuNTkzIDI3OS4zNDcgMzk4LjYyNCAyNzYuMzc4TDM1My4yMTkgMjMwLjk3M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yMjk4XzI5NSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzIyOThfMjk1IiB4MT0iMzczLjMzNiIgeTE9IjExNi44NzYiIHgyPSIyMTQuMjYxIiB5Mj0iNDIxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjI5OF8yOTUiIHgxPSIzMDMuNzgiIHkxPSI4MC41NjIyIiB4Mj0iMTQ0LjcwNSIgeTI9IjM4NS4yNTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZBMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEQzFGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIyOThfMjk1IiB4MT0iMzM4LjMzNiIgeTE9Ijk4LjYwNDEiIHgyPSIxNzkuMjYyIiB5Mj0iNDAzLjI5NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIyOThfMjk1Ij4KPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMjUuNzIyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyIDE0NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
                rpc: [
                    'https://api.testnet.solana.com/'
                ],
            },
            devnet: {
                id: 103,
                name: 'Solana Devnet',
                base: 'svm',
                type: 'devnet',
                logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjI5OF8yOTUpIj4KPHBhdGggZD0iTTE1OC43ODEgMzE2LjI3OEMxNjAuNTE5IDMxNC41NCAxNjIuOTA5IDMxMy41MjYgMTY1LjQ0MyAzMTMuNTI2SDM5NS4yOTNDMzk5LjQ5MyAzMTMuNTI2IDQwMS41OTMgMzE4LjU5NiAzOTguNjI0IDMyMS41NjVMMzUzLjIxOSAzNjYuOTdDMzUxLjQ4MSAzNjguNzA4IDM0OS4wOTEgMzY5LjcyMSAzNDYuNTU3IDM2OS43MjFIMTE2LjcwN0MxMTIuNTA3IDM2OS43MjEgMTEwLjQwNyAzNjQuNjUyIDExMy4zNzYgMzYxLjY4M0wxNTguNzgxIDMxNi4yNzhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0xNTguNzgxIDE0Ni43NTJDMTYwLjU5MSAxNDUuMDE0IDE2Mi45ODEgMTQ0IDE2NS40NDMgMTQ0SDM5NS4yOTNDMzk5LjQ5MyAxNDQgNDAxLjU5MyAxNDkuMDY5IDM5OC42MjQgMTUyLjAzOEwzNTMuMjE5IDE5Ny40NDNDMzUxLjQ4MSAxOTkuMTgxIDM0OS4wOTEgMjAwLjE5NSAzNDYuNTU3IDIwMC4xOTVIMTE2LjcwN0MxMTIuNTA3IDIwMC4xOTUgMTEwLjQwNyAxOTUuMTI2IDExMy4zNzYgMTkyLjE1N0wxNTguNzgxIDE0Ni43NTJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0zNTMuMjE5IDIzMC45NzNDMzUxLjQ4MSAyMjkuMjM1IDM0OS4wOTEgMjI4LjIyMSAzNDYuNTU3IDIyOC4yMjFIMTE2LjcwN0MxMTIuNTA3IDIyOC4yMjEgMTEwLjQwNyAyMzMuMjkgMTEzLjM3NiAyMzYuMjU5TDE1OC43ODEgMjgxLjY2NEMxNjAuNTE5IDI4My40MDIgMTYyLjkwOSAyODQuNDE2IDE2NS40NDMgMjg0LjQxNkgzOTUuMjkzQzM5OS40OTMgMjg0LjQxNiA0MDEuNTkzIDI3OS4zNDcgMzk4LjYyNCAyNzYuMzc4TDM1My4yMTkgMjMwLjk3M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yMjk4XzI5NSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzIyOThfMjk1IiB4MT0iMzczLjMzNiIgeTE9IjExNi44NzYiIHgyPSIyMTQuMjYxIiB5Mj0iNDIxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjI5OF8yOTUiIHgxPSIzMDMuNzgiIHkxPSI4MC41NjIyIiB4Mj0iMTQ0LjcwNSIgeTI9IjM4NS4yNTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZBMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEQzFGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIyOThfMjk1IiB4MT0iMzM4LjMzNiIgeTE9Ijk4LjYwNDEiIHgyPSIxNzkuMjYyIiB5Mj0iNDAzLjI5NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIyOThfMjk1Ij4KPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMjUuNzIyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyIDE0NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
                rpc: [
                    'https://api.devnet.solana.com/'
                ],
            }
        },
    }
};

export function getChainByName(name: string): Chain | undefined {
    const word = name.replaceAll(" ", ".").split('.');
    switch (word.length) {
        case 1: {
            return chainlist[word[0]]['mainnet']
        }
        case 2: {
            return chainlist[word[0]]['mainnet']
        }
        case 3: {
            return (chainlist[word[0]] as any)[(word[1] !== 'testnet' && word[1] !== 'devnet') ? 'testnet' : word[1]][word[2]];
        }
    }
    return undefined;
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
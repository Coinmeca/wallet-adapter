import type { Chain, Chains } from "types";

export const chainlist: Chains = {
    ethereum: {
        mainnet: {
            id: 1,
            base: "evm",
            name: "Ethereum",
            logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzIxMl8yNzYwKSI+CjxwYXRoIGQ9Ik0xMjUwIDI1MDBDMTk0MC4zNiAyNTAwIDI1MDAgMTk0MC4zNiAyNTAwIDEyNTBDMjUwMCA1NTkuNjQ0IDE5NDAuMzYgMCAxMjUwIDBDNTU5LjY0NCAwIDAgNTU5LjY0NCAwIDEyNTBDMCAxOTQwLjM2IDU1OS42NDQgMjUwMCAxMjUwIDI1MDBaIiBmaWxsPSIjNjI3RUVBIi8+CjxwYXRoIGQ9Ik0xMjg4LjkxIDMxMi41VjEwMDUuNDdMMTg3NC42MSAxMjY3LjE5TDEyODguOTEgMzEyLjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYwMiIvPgo8cGF0aCBkPSJNMTI4OC45MSAzMTIuNUw3MDMuMTI1IDEyNjcuMTlMMTI4OC45MSAxMDA1LjQ3VjMxMi41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEyODguOTEgMTcxNi4yNVYyMTg3LjExTDE4NzUgMTM3Ni4yNUwxMjg4LjkxIDE3MTYuMjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYwMiIvPgo8cGF0aCBkPSJNMTI4OC45MSAyMTg3LjExVjE3MTYuMTdMNzAzLjEyNSAxMzc2LjI1TDEyODguOTEgMjE4Ny4xMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMjg4LjkxIDE2MDcuMjdMMTg3NC42MSAxMjY3LjE5TDEyODguOTEgMTAwNS42MlYxNjA3LjI3WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik03MDMuMTI1IDEyNjcuMTlMMTI4OC45MSAxNjA3LjI3VjEwMDUuNjJMNzAzLjEyNSAxMjY3LjE5WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42MDIiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8zMjEyXzI3NjAiPgo8cmVjdCB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=",
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
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            }
        },
        testnet: {
            holesky: {
                id: 17000,
                base: "evm",
                name: "Holesky",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzIxMl8yNzYwKSI+CjxwYXRoIGQ9Ik0xMjUwIDI1MDBDMTk0MC4zNiAyNTAwIDI1MDAgMTk0MC4zNiAyNTAwIDEyNTBDMjUwMCA1NTkuNjQ0IDE5NDAuMzYgMCAxMjUwIDBDNTU5LjY0NCAwIDAgNTU5LjY0NCAwIDEyNTBDMCAxOTQwLjM2IDU1OS42NDQgMjUwMCAxMjUwIDI1MDBaIiBmaWxsPSIjNjI3RUVBIi8+CjxwYXRoIGQ9Ik0xMjg4LjkxIDMxMi41VjEwMDUuNDdMMTg3NC42MSAxMjY3LjE5TDEyODguOTEgMzEyLjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYwMiIvPgo8cGF0aCBkPSJNMTI4OC45MSAzMTIuNUw3MDMuMTI1IDEyNjcuMTlMMTI4OC45MSAxMDA1LjQ3VjMxMi41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEyODguOTEgMTcxNi4yNVYyMTg3LjExTDE4NzUgMTM3Ni4yNUwxMjg4LjkxIDE3MTYuMjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYwMiIvPgo8cGF0aCBkPSJNMTI4OC45MSAyMTg3LjExVjE3MTYuMTdMNzAzLjEyNSAxMzc2LjI1TDEyODguOTEgMjE4Ny4xMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMjg4LjkxIDE2MDcuMjdMMTg3NC42MSAxMjY3LjE5TDEyODguOTEgMTAwNS42MlYxNjA3LjI3WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik03MDMuMTI1IDEyNjcuMTlMMTI4OC45MSAxNjA3LjI3VjEwMDUuNjJMNzAzLjEyNSAxMjY3LjE5WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42MDIiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8zMjEyXzI3NjAiPgo8cmVjdCB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=",
                rpc: [
                    "https://ethereum-holesky.blockpi.network/v1/rpc/public",
                    "https://rpc.holesky.ethpandaops.io",
                    "https://ethereum-holesky-rpc.publicnode.com",
                    "https://1rpc.io/holesky",
                    "wss://ethereum-holesky-rpc.publicnode.com",
                ],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            },
            sepolia: {
                id: 11155111,
                base: "evm",
                name: "Sepolia",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzIxMl8yNzYwKSI+CjxwYXRoIGQ9Ik0xMjUwIDI1MDBDMTk0MC4zNiAyNTAwIDI1MDAgMTk0MC4zNiAyNTAwIDEyNTBDMjUwMCA1NTkuNjQ0IDE5NDAuMzYgMCAxMjUwIDBDNTU5LjY0NCAwIDAgNTU5LjY0NCAwIDEyNTBDMCAxOTQwLjM2IDU1OS42NDQgMjUwMCAxMjUwIDI1MDBaIiBmaWxsPSIjNjI3RUVBIi8+CjxwYXRoIGQ9Ik0xMjg4LjkxIDMxMi41VjEwMDUuNDdMMTg3NC42MSAxMjY3LjE5TDEyODguOTEgMzEyLjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYwMiIvPgo8cGF0aCBkPSJNMTI4OC45MSAzMTIuNUw3MDMuMTI1IDEyNjcuMTlMMTI4OC45MSAxMDA1LjQ3VjMxMi41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEyODguOTEgMTcxNi4yNVYyMTg3LjExTDE4NzUgMTM3Ni4yNUwxMjg4LjkxIDE3MTYuMjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYwMiIvPgo8cGF0aCBkPSJNMTI4OC45MSAyMTg3LjExVjE3MTYuMTdMNzAzLjEyNSAxMzc2LjI1TDEyODguOTEgMjE4Ny4xMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMjg4LjkxIDE2MDcuMjdMMTg3NC42MSAxMjY3LjE5TDEyODguOTEgMTAwNS42MlYxNjA3LjI3WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik03MDMuMTI1IDEyNjcuMTlMMTI4OC45MSAxNjA3LjI3VjEwMDUuNjJMNzAzLjEyNSAxMjY3LjE5WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42MDIiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8zMjEyXzI3NjAiPgo8cmVjdCB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=",
                rpc: [
                    "https://api.zan.top/node/v1/eth/sepolia/public",
                    "https://endpoints.omniatech.io/v1/eth/sepolia/public",
                    "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
                    "https://eth-sepolia.public.blastapi.io",
                    "https://public.stackup.sh/api/v1/node/ethereum-sepolia",
                    "https://rpc.sepolia.ethpandaops.io",
                    "https://gateway.tenderly.co/public/sepolia",
                    "https://sepolia.gateway.tenderly.co",
                    "https://rpc2.sepolia.org",
                    "https://eth-sepolia-public.unifra.io",
                    "https://eth-sepolia.api.onfinality.io/public",
                    "https://rpc-sepolia.rockx.com",
                    "https://ethereum-sepolia-rpc.publicnode.com",
                    "https://1rpc.io/sepolia",
                    "wss://ethereum-sepolia-rpc.publicnode.com",
                    "wss://sepolia.gateway.tenderly.co",
                ],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            }
        }
    },
    optimism: {
        mainnet: {
            id: 10,
            base: "evm",
            name: "Optimism",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEVHcEz/BCD/BCD/BCD/BCD/BCD/BCD/Ax//BCD/AyD/AyD/ABX//f3/AAH/gIb/5Ob/Xmf/QUz/HzH/s7b/zdBwbv+qAAAACnRSTlMAh2Dgwz8y+u0W66fO0wAAAMxJREFUKJF9k+0agiAMhSHJkO0MUO//WiNjmmU7P0B5n30ynFONPsSUYvCj+9atAVW8ndA0pJOG6WD39KO7wXY6XbGU3p6HazhseV6zlF45x38wttr3H6Jt2bZNo/OKUGQmKiKCfuRd6F8zc+aKta3cadCQyBnIK3jBzIV60IcaCmHNYKkLz92b6xELV2pmlZv3oimp22YJ4SoMQFnUhLA0G3k5PgoNeymohUCl0gH90YTeg48WjXb77MabV2Zftjkm9oDZo2kP9Z/n8ASkXBmW2axKlAAAAABJRU5ErkJggg==",
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
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            }
        },
        testnet: {
            goerli: {
                id: 420,
                base: "evm",
                name: "Optimism Goerli",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEVHcEz/BCD/BCD/BCD/BCD/BCD/BCD/Ax//BCD/AyD/AyD/ABX//f3/AAH/gIb/5Ob/Xmf/QUz/HzH/s7b/zdBwbv+qAAAACnRSTlMAh2Dgwz8y+u0W66fO0wAAAMxJREFUKJF9k+0agiAMhSHJkO0MUO//WiNjmmU7P0B5n30ynFONPsSUYvCj+9atAVW8ndA0pJOG6WD39KO7wXY6XbGU3p6HazhseV6zlF45x38wttr3H6Jt2bZNo/OKUGQmKiKCfuRd6F8zc+aKta3cadCQyBnIK3jBzIV60IcaCmHNYKkLz92b6xELV2pmlZv3oimp22YJ4SoMQFnUhLA0G3k5PgoNeymohUCl0gH90YTeg48WjXb77MabV2Zftjkm9oDZo2kP9Z/n8ASkXBmW2axKlAAAAABJRU5ErkJggg==",
                rpc: [
                    "https://goerli.optimism.io"
                ],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            },
            sepolia: {
                id: 420,
                base: "evm",
                name: "Optimism Sepolia",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEVHcEz/BCD/BCD/BCD/BCD/BCD/BCD/Ax//BCD/AyD/AyD/ABX//f3/AAH/gIb/5Ob/Xmf/QUz/HzH/s7b/zdBwbv+qAAAACnRSTlMAh2Dgwz8y+u0W66fO0wAAAMxJREFUKJF9k+0agiAMhSHJkO0MUO//WiNjmmU7P0B5n30ynFONPsSUYvCj+9atAVW8ndA0pJOG6WD39KO7wXY6XbGU3p6HazhseV6zlF45x38wttr3H6Jt2bZNo/OKUGQmKiKCfuRd6F8zc+aKta3cadCQyBnIK3jBzIV60IcaCmHNYKkLz92b6xELV2pmlZv3oimp22YJ4SoMQFnUhLA0G3k5PgoNeymohUCl0gH90YTeg48WjXb77MabV2Zftjkm9oDZo2kP9Z/n8ASkXBmW2axKlAAAAABJRU5ErkJggg==",
                rpc: [
                    "https://sepolia.optimism.io"
                ],
                explorer: [
                    "https://sepolia-optimistic.etherscan.io"
                ],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            }
        },
    },
    bsc: {
        mainnet: {
            id: 56,
            base: "evm",
            name: "BNB Smart Chain",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAKlBMVEVHcEzwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQqwMrdXAAAADnRSTlMAG564LYLx/23O4FYLQANehvgAAAEFSURBVHgBTNClQgVREADQWSsruMVXcBrulsh4xPuzWSi407BEwd3d+YPb0I/hKrxZPSt3BEQkFUFMpA5gy78yVhGHRpWcUtyaxdCCpI7dxGzDKg53Qjv/cUa8nISMBMo7DLhm6SABa2D3FcyBaMDVSkN1lFgH5s6S+jiZsyBZLLVkUbpzBTfIEmHE6nsF8Agli4hHADQCiuAlgLlR5wxwjmhZfCmWAqP0Ilb+SGhCPHIfJG+KdMSqpIiiz3itmCy4JLimPTF+JzRSshbAoBQtwCfPGGLZD1j7neiDdwrXuMXaBzPLd4h5et1N5OhyjK3ZqvNTkPHGlkqEv/gdR3p5AIKHiBQAFI5lv+lWG40AAAAASUVORK5CYII=",
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
                name: "Binance Coin",
                symbol: "BNB",
                decimals: 18
            },
        },
        testnet: {
            testnet: {
                id: 97,
                base: "evm",
                name: "BNB Smart Chain Testnet",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAKlBMVEVHcEzwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQrwuQqwMrdXAAAADnRSTlMAG564LYLx/23O4FYLQANehvgAAAEFSURBVHgBTNClQgVREADQWSsruMVXcBrulsh4xPuzWSi407BEwd3d+YPb0I/hKrxZPSt3BEQkFUFMpA5gy78yVhGHRpWcUtyaxdCCpI7dxGzDKg53Qjv/cUa8nISMBMo7DLhm6SABa2D3FcyBaMDVSkN1lFgH5s6S+jiZsyBZLLVkUbpzBTfIEmHE6nsF8Agli4hHADQCiuAlgLlR5wxwjmhZfCmWAqP0Ilb+SGhCPHIfJG+KdMSqpIiiz3itmCy4JLimPTF+JzRSshbAoBQtwCfPGGLZD1j7neiDdwrXuMXaBzPLd4h5et1N5OhyjK3ZqvNTkPHGlkqEv/gdR3p5AIKHiBQAFI5lv+lWG40AAAAASUVORK5CYII=",
                rpc: [
                    "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
                    "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
                    "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
                    "https://data-seed-prebsc-1-s2.bnbchain.org:8545",
                    "https://bsc-testnet.blockpi.network/v1/rpc/public",
                    "https://api.zan.top/node/v1/bsc/testnet/public",
                    "https://public.stackup.sh/api/v1/node/bsc-testnet",
                    "https://bsc-testnet-rpc.publicnode.com",
                    "https://bsc-testnet.public.blastapi.io",
                    "https://endpoints.omniatech.io/v1/bsc/testnet/public",
                    "wss://bsc-testnet-rpc.publicnode.com",
                ],
                explorer: ["https://testnet.bscscan.com/"],
                nativeCurrency: {
                    name: "Testnet Binance Coin",
                    symbol: "tBNB",
                    decimals: 18
                },
            }
        }
    },
    gnosis: {
        mainnet: {
            id: 100,
            base: "evm",
            name: "Gnosis",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAKlBMVEU+aVdHcEw+aVc9Z1U+aVc+aVc9aFY+aVc+aVc9aFY9aFY+aVc9aFY9aFa0wS0JAAAADnRSTlP/AIIU7Mhh3LkuO5wfSHwab1sAAAD3SURBVCiRdZProoQgCIQHvGHq+7/uAdTWdjvzw4pPx0AEbVVOEYiJ6x3CemYFQCk2xvyAQYMyZmSITgofeAEp3GYUFF8bKsv0UAbGgkCjLzVgwQDwkzEQHObyQ52VrDAifVFnCZFQYfYnnZ6a9wW2X5WDznX2w4yk7+NwXp5Dc1BnddVZmy6mboBXtHZsuhm6xUzNcoZn5DnoKGYx11ZiTagbDdQFkak7Mg/MA2nUO81KDosm+HLExmL72n7CzY9VUcWhJOdXtfL9o0ie5Lus8FTeWfHzDO8w3G3yq+tosDd2tOZjv6M176ZeOTyb2lRZ7DrIcR3+APX8BR6lfT+rAAAAAElFTkSuQmCC",
            rpc: [
                "https://rpc.ankr.com/gnosis",
                "https://gnosis-pokt.nodies.app",
                "https://gnosis-mainnet.public.blastapi.io",
                "https://gnosis.blockpi.network/v1/rpc/public",
                "https://endpoints.omniatech.io/v1/gnosis/mainnet/public",
                "https://gnosis.oat.farm",
                "https://gnosis.drpc.org",
                "https://gnosis-rpc.publicnode.com",
                "https://1rpc.io/gnosis",
                "https://rpc.gnosischain.com",
                "https://rpc.tornadoeth.cash/gnosis",
                "wss://gnosis-rpc.publicnode.com",
                "wss://rpc.gnosischain.com/wss",
            ],
            explorer: [
                "https://gnosisscan.io/"
            ],
            nativeCurrency: {
                name: "xDAI",
                symbol: "XDAI",
                decimals: 18
            }
        },
        testnet: {
            chiado: {
                id: 10200,
                base: "evm",
                name: "Gnosis Chiado",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAS1BMVEUAFCgAAh4ADiRfaHMAFCgAFCj///8AFCgAFCgAFCinrbPl5+oTJTj5+vptdn+Ql59OWGR/h5AfMEKboag1PkzX2966vsTr7e/Gy88bH7tKAAAACnRSTlP6////tP//rx2pnoS5tgAAAUFJREFUKJF9k9magyAMhQ0Zog37Ivr+TzrRgq2dJTcS/o9DQo7T8pj0rzHNy/S4MqVAQqlrY57GOQW6RsRYNQx8MbCe91ViZ29h0M5iM3tJ3qeymxbhDSrAbfVVviJZ/bohvCB41/IoRUFuzsOACgKlqwxJE4UzFagy5uCC7VRZSWRLnRC8YV22ToVtRbM5hCetNNOebTEnFWaKzTuxAIF1pxQ5n/RkmWOivR4Q4uowkdAtAIhmZkroVmlWIBpCJMe2uJRcseyO3OCArBrJLYEoSAXUFA8YV3LJ+oBVl6IrBm+To6fsUZCIekyNc+aW0ItwL0gfQoI32WHuC+qtHI9APZwbq/4I0nejH9Hs8/mkJPPJzDnS58hwu7M+0DHs21nzPmyhYpML3W1yGcyYu8H+teb88vinqb+mZf7jd9Bfyzf4jRhskFfflgAAAABJRU5ErkJggg==",
                rpc: [
                    "https://1rpc.io/gnosis"
                ],
                explorer: [
                    "https://gnosis-chiado.blockscout.com/"
                ],
                nativeCurrency: {
                    name: "xDAI",
                    symbol: "XDAI",
                    decimals: 18
                }
            }
        }
    },
    polygon: {
        mainnet: {
            id: 137,
            base: "evm",
            name: "Polygon",
            logo: "https://coinmeca-web3.vercel.app/137/logo.svg",
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
                name: "Polygon",
                symbol: "MATIC",
                decimals: 18
            },
        },
        testnet: {
            mumbai: {
                id: 80001,
                base: "evm",
                name: "Polygon Mumbai",
                logo: "https://coinmeca-web3.vercel.app/137/logo.svg",
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
                explorer: ["https://mumbai.polygonscan.com/"],
                nativeCurrency: {
                    name: "Polygon",
                    symbol: "MATIC",
                    decimals: 18
                },
            },
        },
    },
    polygon_zkevm: {
        mainnet: {
            id: 1101,
            base: "evm",
            name: "Polygon zkEVM",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEx7P+R7P+R7P+R7P+R7P+V7P+R7PuR7P+R7P+R7P+Z7P+R7P+Wom7PeAAAADXRSTlMAH7P/o22SP+3LFX5Vbg7mjAAAALBJREFUeAFjIBYwKhsJoAg4GxubIPODjR3YjE0R/ArjiQwMK43bITwwEyI8C8JnM7aGaUwA05NNGE7vXgDEDM6WID6PsQCrsbEBCDMaHwAKsJgycJrsMAdhhmAHoACTDQOnOQQyHFZAEwiGCvBshECGyVABGFhkDBYwdTaGAYgAgmsSDBHQgmmB2mIJNxQqYIrhDmQBDKdjeA7q/Wq49zEDCDMIMQMZEQ3oEYUZlUQCAHdePrGmeAqLAAAAAElFTkSuQmCC",
            rpc: [
                "https://zkevm-rpc.com"
            ],
            nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            },
        },
        testnet: {
            testnet: {
                id: 1442,
                base: "evm",
                name: "Polygon zkEVM Testnet",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEx7P+R7P+R7P+R7P+R7P+V7P+R7PuR7P+R7P+R7P+Z7P+R7P+Wom7PeAAAADXRSTlMAH7P/o22SP+3LFX5Vbg7mjAAAALBJREFUeAFjIBYwKhsJoAg4GxubIPODjR3YjE0R/ArjiQwMK43bITwwEyI8C8JnM7aGaUwA05NNGE7vXgDEDM6WID6PsQCrsbEBCDMaHwAKsJgycJrsMAdhhmAHoACTDQOnOQQyHFZAEwiGCvBshECGyVABGFhkDBYwdTaGAYgAgmsSDBHQgmmB2mIJNxQqYIrhDmQBDKdjeA7q/Wq49zEDCDMIMQMZEQ3oEYUZlUQCAHdePrGmeAqLAAAAAElFTkSuQmCC",
                rpc: [
                    "https://rpc.public.zkevm-test.net"
                ],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                },
            }
        }
    },
    fantom: {
        mainnet: {
            id: 250,
            base: "evm",
            name: "Fantom Opera",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUZaf8AY/8AX/8AYf+atf/e6P+guf8MZf8AW/+Nq//n7/+Hp/+Rr/8AVf+Xsv9ij//h6v8AXv9Uhv/d5v8scv/O2//I1v8ibf++z//Y4/85d/9JgP+5y/+rwf9nkv/R3v8pcP91m/9ci/+vxP/w9f8O9r57AAAAyElEQVR4AcXORQKEMAwF0CQdJqG4u3P/M44LtuZD9dXg7CCROqSLYVwVAuKaWExtiljadlxbrczzLwECoNh+GMVLpCTNAriHIC/Cco1VkWdEUEdVIrBGFK9omqKVoKMN8n2X1mkZ0A7eDwxbs+zSfotp4YkaXCVh0gUbjIYHkozdFhOcfK8172+GgwfNcxrvPojvFfTEoDYY3PGdDWZVF7yVpVgh+60ehB80aIuXqK6N3F8rMho1I8BKGSjLiyLvCXZz54wYzs0NEbAM+fJTno8AAAAASUVORK5CYII=",
            rpc: [
                "https://rpc.ftm.tools",
                "https://fantom.blockpi.network/v1/rpc/public",
                "https://fantom-mainnet.public.blastapi.io",
                "https://fantom.drpc.org",
                "https://rpc.fantom.gateway.fm",
                "https://rpcapi.fantom.network",
                "https://rpc3.fantom.network",
                "https://fantom-pokt.nodies.app",
                "https://rpc.fantom.network",
                "https://rpc2.fantom.network",
                "https://endpoints.omniatech.io/v1/fantom/mainnet/public",
                "https://fantom-rpc.publicnode.com",
                "wss://fantom-rpc.publicnode.com",
            ],
            explorer: ["https://ftmscan.com/"],
            nativeCurrency: {
                name: "Fantom",
                symbol: "FTM",
                decimals: 18,
            }
        },
        testnet: {
            sonic: {
                id: 4002,
                base: "evm",
                name: "Fantom Sonic",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUZaf8AY/8AX/8AYf+atf/e6P+guf8MZf8AW/+Nq//n7/+Hp/+Rr/8AVf+Xsv9ij//h6v8AXv9Uhv/d5v8scv/O2//I1v8ibf++z//Y4/85d/9JgP+5y/+rwf9nkv/R3v8pcP91m/9ci/+vxP/w9f8O9r57AAAAyElEQVR4AcXORQKEMAwF0CQdJqG4u3P/M44LtuZD9dXg7CCROqSLYVwVAuKaWExtiljadlxbrczzLwECoNh+GMVLpCTNAriHIC/Cco1VkWdEUEdVIrBGFK9omqKVoKMN8n2X1mkZ0A7eDwxbs+zSfotp4YkaXCVh0gUbjIYHkozdFhOcfK8172+GgwfNcxrvPojvFfTEoDYY3PGdDWZVF7yVpVgh+60ehB80aIuXqK6N3F8rMho1I8BKGSjLiyLvCXZz54wYzs0NEbAM+fJTno8AAAAASUVORK5CYII=",
                rpc: [
                    "https://fantom.api.onfinality.io/public",
                ],
                explorer: ["https://testnet.ftmscan.com/"],
                nativeCurrency: {
                    name: "Fantom",
                    symbol: "FTM",
                    decimals: 18,
                }
            }
        }
    },
    base: {
        mainnet: {
            id: 8453,
            base: "evm",
            name: "Base",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAxklEQVR4AWJwL/AhiBmC/psBcReg2DqwoBgGwji+RAd4U2SEN0YXeDs8IHSAdqFAl8gEt8T1wqk2LXc0+Yo/FP0RSXJSkkhijfRblILrXwb0qwArkkYXWEEfCzLK0mCCin0lblS4ggbWGq2XkTs13IHUEcwnUHcjd248ggyIirVvFFChgDMQjAXMQDAV8N+o5ABJj8XzFGUrPKhLsT4sOS8OemXTLEAwwg8+9GqDX9745wn/AONHDPwQhR8T8YOwf9SfWoz6GwrQB9oIu62tAAAAAElFTkSuQmCC",
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
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            }
        },
        testnet: {
            sepolia: {
                id: 84532,
                base: "evm",
                name: "Base Sepolia",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAxklEQVR4AWJwL/AhiBmC/psBcReg2DqwoBgGwji+RAd4U2SEN0YXeDs8IHSAdqFAl8gEt8T1wqk2LXc0+Yo/FP0RSXJSkkhijfRblILrXwb0qwArkkYXWEEfCzLK0mCCin0lblS4ggbWGq2XkTs13IHUEcwnUHcjd248ggyIirVvFFChgDMQjAXMQDAV8N+o5ABJj8XzFGUrPKhLsT4sOS8OemXTLEAwwg8+9GqDX9745wn/AONHDPwQhR8T8YOwf9SfWoz6GwrQB9oIu62tAAAAAElFTkSuQmCC",
                rpc: ["https://sepolia.base.org"],
                explorer: ["https://sepolia.basescan.org/"],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            }
        }
    },
    arbitrum: {
        mainnet: {
            id: 42161,
            base: "evm",
            name: "Arbitrum One",
            logo: "https://coinmeca-web3.vercel.app/42161/logo.svg",
            rpc: [
                "https://arbitrum-mainnet.infura.io",
                "https://rpc.arb1.arbitrum.gateway.fm",
                "https://endpoints.omniatech.io/v1/arbitrum/one/public",
                "https://arbitrum-one.public.blastapi.io",
                "wss://arbitrum-one.publicnode.com"
            ],
            nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            },
        },
        testnet: {
            sepolia: {
                id: 421614,
                base: "evm",
                name: "Arbitrum Sepolia",
                logo: "https://coinmeca-web3.vercel.app/42161/logo.svg",
                rpc: [
                    "https://sepolia-rollup.arbitrum.io/rpc",
                    "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
                    "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
                ],
                explorer: ["https://sepolia.arbiscan.io/"],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                },
            },
        }
    },
    celo: {
        mainnet: {
            id: 42220,
            base: "evm",
            name: "Celo",
            logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDI1MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkNGRjUyO30KCS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7fQo8L3N0eWxlPgo8ZyBpZD0iTGF5ZXJfeDAwMjBfMSI+Cgk8ZyBpZD0iXzE5NDI3OTI1NDQ3MzYiPgoJCTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjEyNTAiIGN5PSIxMjUwIiByPSIxMjUwIj48L2NpcmNsZT4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTk0OS4zLDU0Ni4ySDU1MC43djE0MDcuN2gxMzk4Ljd2LTQ5MS40aC0yMzIuMWMtODAsMTc5LjMtMjYwLjEsMzA0LjEtNDY2LjIsMzA0LjEgICAgYy0yODQuMSwwLTUxNC4yLTIzMy42LTUxNC4yLTUxNy41YzAtMjg0LDIzMC4xLTUxNS42LDUxNC4yLTUxNS42YzIxMC4xLDAsMzkwLjIsMTI4LjksNDcwLjIsMzEyLjFoMjI4LjFWNTQ2LjJ6Ij48L3BhdGg+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==",
            rpc: [
                "https://forno.celo.org"
            ],
            nativeCurrency: {
                name: "Celo",
                symbol: "CELO",
                decimals: 18
            },
        },
        testnet: {
            alfajores: {
                id: 44787,
                base: "evm",
                name: "Celo Alfajores",
                logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDI1MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkNGRjUyO30KCS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7fQo8L3N0eWxlPgo8ZyBpZD0iTGF5ZXJfeDAwMjBfMSI+Cgk8ZyBpZD0iXzE5NDI3OTI1NDQ3MzYiPgoJCTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjEyNTAiIGN5PSIxMjUwIiByPSIxMjUwIj48L2NpcmNsZT4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTk0OS4zLDU0Ni4ySDU1MC43djE0MDcuN2gxMzk4Ljd2LTQ5MS40aC0yMzIuMWMtODAsMTc5LjMtMjYwLjEsMzA0LjEtNDY2LjIsMzA0LjEgICAgYy0yODQuMSwwLTUxNC4yLTIzMy42LTUxNC4yLTUxNy41YzAtMjg0LDIzMC4xLTUxNS42LDUxNC4yLTUxNS42YzIxMC4xLDAsMzkwLjIsMTI4LjksNDcwLjIsMzEyLjFoMjI4LjFWNTQ2LjJ6Ij48L3BhdGg+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==",
                rpc: [
                    "https://alfajores-forno.celo-testnet.org"
                ],
                nativeCurrency: {
                    name: "Celo",
                    symbol: "CELO",
                    decimals: 18
                },
            },
        }
    },
    avalanche: {
        mainnet: {
            id: 43114,
            base: "evm",
            name: "Avalanche C-chain",
            logo: "https://coinmeca-web3.vercel.app/43114/logo.svg",
            rpc: [
                "https://avalanche-mainnet.infura.io",
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
                name: "Avalanche",
                symbol: "AVAX",
                decimals: 18
            },
        },
        testnet: {
            fuji: {
                id: 43113,
                base: "evm",
                name: "Avalanche Fuji",
                logo: "https://coinmeca-web3.vercel.app/43114/logo.svg",
                rpc: ["https://api.avax-test.network/ext/bc/C/rpc"],
                explorer: [
                    "https://testnet.snowtrace.io/"
                ],
                nativeCurrency: {
                    name: "Avalanche",
                    symbol: "AVAX",
                    decimals: 18
                },
            }
        }
    },
    berachain: {
        testnet: {
            artio: {
                id: 80085,
                base: "evm",
                name: "Berachain Artio",
                logo: "https://coinmeca-web3.vercel.app/80085/logo.svg",
                rpc: [
                    "https://artio.rpc.berachain.com/"
                ],
                explorer: [
                    "https://artio.beratrail.io/"
                ],
                nativeCurrency: {
                    name: "Bera",
                    symbol: "BERA",
                    decimals: 18
                }
            }
        }
    },
    blast: {
        mainnet: {
            id: 81457,
            base: "evm",
            name: "Blast",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAQlBMVEVHcEwAAAAAAAAAAAAAAAAAAQcAAAAAAAAAAAAAAAAAAAAAAAA4NxZycRNZWBv+/hP//wLU1BmtrR+DgxjHxx7p6RwhXe+nAAAADHRSTlMATpbK7P8QpP+Q6h2+StNaAAAA5UlEQVR4AXTSBRLDMAwEQBnUXNj4/69WM4bwtmFRgE6UNpbZGq3oxW/AyfCjmxE34zV9wsN0KjLj1dzz8aHVmPBhus/3MJ4aLOtNbzJAYNvdjWcAgwRAcNjdw84AiBQA3qJY40lwLkEo0hAMkRccJGCF0GRQbW6P6PbSAYbsKUcCYih2X+pZ4ksO12HLZcE9YJOzsk5F78Zkzx2axe2hPW2DIpep7tGGdMuRDuIerUn1nJy6+qCFImo5F3mrAe1lLftZXlEN7XXzBfjyTf2HL8EQSnIEEy3BZE844xDOeoQzL8HsDwCQ1h/nenuvTQAAAABJRU5ErkJggg==",
            rpc: [
                "https://rpc.blast.io",
                "https://rpc.ankr.com/blast",
                "https://blast.din.dev/rpc",
                "https://blastl2-mainnet.public.blastapi.io",
                "https://blast.blockpi.network/v1/rpc/public",
                "https://blast.gasswap.org",
                "wss://blast.gasswap.org",
            ],
            explorer: ["https://blastscan.io"],
            nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            },
        },
        testnet: {
            sepolia: {
                id: 168587773,
                base: "evm",
                name: "Blast Sepolia Testnet",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAQlBMVEVHcEwAAAAAAAAAAAAAAAAAAQcAAAAAAAAAAAAAAAAAAAAAAAA4NxZycRNZWBv+/hP//wLU1BmtrR+DgxjHxx7p6RwhXe+nAAAADHRSTlMATpbK7P8QpP+Q6h2+StNaAAAA5UlEQVR4AXTSBRLDMAwEQBnUXNj4/69WM4bwtmFRgE6UNpbZGq3oxW/AyfCjmxE34zV9wsN0KjLj1dzz8aHVmPBhus/3MJ4aLOtNbzJAYNvdjWcAgwRAcNjdw84AiBQA3qJY40lwLkEo0hAMkRccJGCF0GRQbW6P6PbSAYbsKUcCYih2X+pZ4ksO12HLZcE9YJOzsk5F78Zkzx2axe2hPW2DIpep7tGGdMuRDuIerUn1nJy6+qCFImo5F3mrAe1lLftZXlEN7XXzBfjyTf2HL8EQSnIEEy3BZE844xDOeoQzL8HsDwCQ1h/nenuvTQAAAABJRU5ErkJggg==",
                rpc: [
                    "https://sepolia.blast.io",
                    "https://blast-sepolia.drpc.org",
                    "https://blast-sepolia.blockpi.network/v1/rpc/public",
                    "wss://blast-sepolia.drpc.org",
                ],
                explorer: ["https://testnet.blastscan.io"],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                },
            }
        }
    },
    zora: {
        mainnet: {
            id: 7777777,
            base: "evm",
            name: "Zora",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAxlBMVEVHcEw3HR1xQCNeOC1lTV1uQSpVNDJARIk4JkdXLR4yHCOcmuiinel9SihcMR+NkuZuheY/OGlKaMdGV6hNYbh7jOmGkOlNb9RGW7JHW69TcdImERctFRU/Zc5AWLM9atoqFiJIfPO7quswGy7ty+tdhfQ9b+Q/de1APXignu41IjtBS5nKsOn52+9LJRqQmO9vjPM+XsM7LFLgvuk7Gxc9MV6upOzVt+l6kPE/UKRqOiL/6vVhgupNduFTfu0/N2uFk+55Ryd8SkoSAAAAG3RSTlMA4+uFFjRe/v78PTji1MBe68/A6zC/g+iD/IZPjXSDAAABp0lEQVQokWXS6aKaMBQE4AAiYNXerSuCyKKsAkFBBIT7/i/VScSl7fz0cw6HEEJu+fj59qNrX759/0L+zfTdNLpLexrSIJh//Ysmr8rV0sC249ieTx42o36dr7s2S0s7roqiiu377FnYo7i9eENgV4WLFHE56sRRWXF3QTEu3CRJXLeKg+tkwcFUY73zstSu3KRpmoRV53xPKzyyqZsHNgkwZTsLT1g+NYcXQuTViPdnNnhoZQdD+0Ek/YYb7/S0bXpqf5MlmlRhC2Eu3mV8TxS7NyKsdIefAatmaVDaSBkMWdu9Ew2o9hGfC8UBBkGanmDGL6Id+EOv1Y0HRjLv0q3ziIgHfaxCOSMXmGEqZLlfoUr9UcHIbguLXomk8eoRmoOZb0EwXyLymVVvaqxZDCOHUZkQUTuMqtSmmbOYZqT0VGUHf95zDWnvK1FU13UUKf6RhlP2WRZcsZVKj72P9D3IEa4f+3NUxwlVlVKqqqFjWeM1kkfVLQt/QCxLX81ulwiqgZmPeRgmLzjDeQ7C09VkO4tgbc+jTf+787K0EM9ncSnJ95/+AL7bXf1cqXaUAAAAAElFTkSuQmCC",
            rpc: ["https://rpc.zora.energy"],
            explorer: ["https://explorer.zora.energy/"],
            nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            }
        },
        testnet: {
            sepolia: {
                id: 999999999,
                name: "Zora Sepolia",
                base: "evm",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIzNThfMzIxKSI+CjxwYXRoIGQ9Ik00MCAyMEM0MCA4Ljk1NDMxIDMxLjA0NTcgMCAyMCAwQzguOTU0MzEgMCAwIDguOTU0MzEgMCAyMEMwIDMxLjA0NTcgOC45NTQzMSA0MCAyMCA0MEMzMS4wNDU3IDQwIDQwIDMxLjA0NTcgNDAgMjBaIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjM1OF8zMjEpIi8+CjxwYXRoIGQ9Ik00MCAyMEM0MCA4Ljk1NDMgMzEuMDQ1NyAwIDIwIDBDOC45NTQzIDAgMCA4Ljk1NDMgMCAyMEMwIDMxLjA0NTcgOC45NTQzIDQwIDIwIDQwQzMxLjA0NTcgNDAgNDAgMzEuMDQ1NyA0MCAyMFoiIGZpbGw9InVybCgjcGFpbnQxX3JhZGlhbF8yMzU4XzMyMSkiLz4KPC9nPgo8ZGVmcz4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzIzNThfMzIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDI1Ljk4MzUgOS43NDI5OSkgc2NhbGUoMzAuMTE2MykiPgo8c3RvcCBvZmZzZXQ9IjAuMTU2MjUiIHN0b3AtY29sb3I9IiNEQ0M4RDAiLz4KPHN0b3Agb2Zmc2V0PSIwLjMwMjA4MyIgc3RvcC1jb2xvcj0iIzc4QzhDRiIvPgo8c3RvcCBvZmZzZXQ9IjAuNDI3MDgzIiBzdG9wLWNvbG9yPSIjNEQ5NTlFIi8+CjxzdG9wIG9mZnNldD0iMC41NTcyOTIiIHN0b3AtY29sb3I9IiMzMDVFQjkiLz4KPHN0b3Agb2Zmc2V0PSIwLjc5Njg3NSIgc3RvcC1jb2xvcj0iIzMxMUYxMiIvPgo8c3RvcCBvZmZzZXQ9IjAuOTA2MjUiIHN0b3AtY29sb3I9IiM2ODQyMzIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMkQxQzEzIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxX3JhZGlhbF8yMzU4XzMyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNS45ODM1IDkuNzQyOTkpIHNjYWxlKDMwLjExNjMpIj4KPHN0b3Agb2Zmc2V0PSIwLjA2NzcwODMiIHN0b3AtY29sb3I9IiNEQ0Y4Q0YiLz4KPHN0b3Agb2Zmc2V0PSIwLjI1IiBzdG9wLWNvbG9yPSIjRDRGNEFCIi8+CjxzdG9wIG9mZnNldD0iMC40NzM5NTgiIHN0b3AtY29sb3I9IiNBNEYwMjgiLz4KPHN0b3Agb2Zmc2V0PSIwLjg4MDIwOCIgc3RvcC1jb2xvcj0iIzFEQUM0NSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MEM4NkIiLz4KPC9yYWRpYWxHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yMzU4XzMyMSI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
                rpc: ["https://sepolia.rpc.zora.energy"],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            }
        }
    },
    scroll: {
        mainnet: {
            id: 534352,
            base: "evm",
            name: "Scroll",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAflBMVEVHcEwXBwYTAAUiExIjFxVwZV0rHxwGAgIBAAAfERAKAAAYCQrLv68WAACNgneonI8BAAD/+OP/9eCCd23two3//umRhnryx5H77dmwpJbj1cR5bmbguIbt38ydkYUkFhU9LiVQRkDWybjOwbHGoXZYTUfZsoJhVk/AtKWjhGAS31C8AAAAEHRSTlMApeEwJf4Oy+4/wWTod9lO/NSV9AAAANpJREFUKJG10duSgjAQRdGg3HRG7W5uUQyBIJb+/w8OMQJpdR7dr6s4SQUhvtlum/gF8UJr0Fnp121niyFDVnFMZwy6AlFKehJJ8hBu2EZETeYyxNBgAxLLyNUzTI94gnG1cCHDQJPFaTZr0EORDmqcbepnHOO9+nd27GBn68do3b9iuJz5Gaf3IcJ3PC2pX45Uglf0gl2pujY/P7rohOMwKAmXKrdVV1izM01rCn13mFfw4z0D9PZfzV+eYePtJtrgeGblurYr/0YisZfU021XMUMRbpZC8c3+AGdfHbhD7NFQAAAAAElFTkSuQmCC",
            rpc: [
                "https://scroll-mainnet.chainstacklabs.com",
                "https://scroll.blockpi.network/v1/rpc/public",
                "https://scroll-mainnet.rpc.grove.city/v1/a7a7c8e2",
                "https://scroll.drpc.org",
                "https://scroll-mainnet.public.blastapi.io",
                "https://rpc.ankr.com/scroll",
                "https://rpc.scroll.io",
                "https://rpc-scroll.icecreamswap.com",
                "https://1rpc.io/scroll",
            ],
            explorer: [
                "https://scroll.io/rollupscan"
            ],
            nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
            }
        },
        testnet: {
            sepolia: {
                id: 534351,
                base: "evm",
                name: "Scroll Sepolia",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAflBMVEVHcEwXBwYTAAUiExIjFxVwZV0rHxwGAgIBAAAfERAKAAAYCQrLv68WAACNgneonI8BAAD/+OP/9eCCd23two3//umRhnryx5H77dmwpJbj1cR5bmbguIbt38ydkYUkFhU9LiVQRkDWybjOwbHGoXZYTUfZsoJhVk/AtKWjhGAS31C8AAAAEHRSTlMApeEwJf4Oy+4/wWTod9lO/NSV9AAAANpJREFUKJG10duSgjAQRdGg3HRG7W5uUQyBIJb+/w8OMQJpdR7dr6s4SQUhvtlum/gF8UJr0Fnp121niyFDVnFMZwy6AlFKehJJ8hBu2EZETeYyxNBgAxLLyNUzTI94gnG1cCHDQJPFaTZr0EORDmqcbepnHOO9+nd27GBn68do3b9iuJz5Gaf3IcJ3PC2pX45Uglf0gl2pujY/P7rohOMwKAmXKrdVV1izM01rCn13mFfw4z0D9PZfzV+eYePtJtrgeGblurYr/0YisZfU021XMUMRbpZC8c3+AGdfHbhD7NFQAAAAAElFTkSuQmCC",
                rpc: [
                    "https://scroll-sepolia.blockpi.network/v1/rpc/public",
                    "https://sepolia-rpc.scroll.io",
                    "https://scroll-testnet.rpc.grove.city/v1/a7a7c8e2",
                    "https://rpc.ankr.com/scroll_sepolia_testnet",
                    "https://scroll-testnet-public.unifra.io",
                    "https://scroll-sepolia.drpc.org",
                ],
                explorer: [
                    "https://sepolia.scrollscan.com/"
                ],
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                }
            }
        }
    },
    solana: {
        mainnet: {
            id: 101,
            name: "Solana",
            base: "svm",
            type: "mainnet-beta",
            logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjI5OF8yOTUpIj4KPHBhdGggZD0iTTE1OC43ODEgMzE2LjI3OEMxNjAuNTE5IDMxNC41NCAxNjIuOTA5IDMxMy41MjYgMTY1LjQ0MyAzMTMuNTI2SDM5NS4yOTNDMzk5LjQ5MyAzMTMuNTI2IDQwMS41OTMgMzE4LjU5NiAzOTguNjI0IDMyMS41NjVMMzUzLjIxOSAzNjYuOTdDMzUxLjQ4MSAzNjguNzA4IDM0OS4wOTEgMzY5LjcyMSAzNDYuNTU3IDM2OS43MjFIMTE2LjcwN0MxMTIuNTA3IDM2OS43MjEgMTEwLjQwNyAzNjQuNjUyIDExMy4zNzYgMzYxLjY4M0wxNTguNzgxIDMxNi4yNzhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0xNTguNzgxIDE0Ni43NTJDMTYwLjU5MSAxNDUuMDE0IDE2Mi45ODEgMTQ0IDE2NS40NDMgMTQ0SDM5NS4yOTNDMzk5LjQ5MyAxNDQgNDAxLjU5MyAxNDkuMDY5IDM5OC42MjQgMTUyLjAzOEwzNTMuMjE5IDE5Ny40NDNDMzUxLjQ4MSAxOTkuMTgxIDM0OS4wOTEgMjAwLjE5NSAzNDYuNTU3IDIwMC4xOTVIMTE2LjcwN0MxMTIuNTA3IDIwMC4xOTUgMTEwLjQwNyAxOTUuMTI2IDExMy4zNzYgMTkyLjE1N0wxNTguNzgxIDE0Ni43NTJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0zNTMuMjE5IDIzMC45NzNDMzUxLjQ4MSAyMjkuMjM1IDM0OS4wOTEgMjI4LjIyMSAzNDYuNTU3IDIyOC4yMjFIMTE2LjcwN0MxMTIuNTA3IDIyOC4yMjEgMTEwLjQwNyAyMzMuMjkgMTEzLjM3NiAyMzYuMjU5TDE1OC43ODEgMjgxLjY2NEMxNjAuNTE5IDI4My40MDIgMTYyLjkwOSAyODQuNDE2IDE2NS40NDMgMjg0LjQxNkgzOTUuMjkzQzM5OS40OTMgMjg0LjQxNiA0MDEuNTkzIDI3OS4zNDcgMzk4LjYyNCAyNzYuMzc4TDM1My4yMTkgMjMwLjk3M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yMjk4XzI5NSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzIyOThfMjk1IiB4MT0iMzczLjMzNiIgeTE9IjExNi44NzYiIHgyPSIyMTQuMjYxIiB5Mj0iNDIxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjI5OF8yOTUiIHgxPSIzMDMuNzgiIHkxPSI4MC41NjIyIiB4Mj0iMTQ0LjcwNSIgeTI9IjM4NS4yNTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZBMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEQzFGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIyOThfMjk1IiB4MT0iMzM4LjMzNiIgeTE9Ijk4LjYwNDEiIHgyPSIxNzkuMjYyIiB5Mj0iNDAzLjI5NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIyOThfMjk1Ij4KPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMjUuNzIyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyIDE0NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
            rpc: [
                "https://api.mainnet-beta.solana.com"
            ],
            nativeCurrency: {
                name: "Solana",
                symbol: "Sol",
                decimals: 9
            }
        },
        testnet: {
            testnet: {
                id: 102,
                name: "Solana Testnet",
                base: "svm",
                type: "testnet",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjI5OF8yOTUpIj4KPHBhdGggZD0iTTE1OC43ODEgMzE2LjI3OEMxNjAuNTE5IDMxNC41NCAxNjIuOTA5IDMxMy41MjYgMTY1LjQ0MyAzMTMuNTI2SDM5NS4yOTNDMzk5LjQ5MyAzMTMuNTI2IDQwMS41OTMgMzE4LjU5NiAzOTguNjI0IDMyMS41NjVMMzUzLjIxOSAzNjYuOTdDMzUxLjQ4MSAzNjguNzA4IDM0OS4wOTEgMzY5LjcyMSAzNDYuNTU3IDM2OS43MjFIMTE2LjcwN0MxMTIuNTA3IDM2OS43MjEgMTEwLjQwNyAzNjQuNjUyIDExMy4zNzYgMzYxLjY4M0wxNTguNzgxIDMxNi4yNzhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0xNTguNzgxIDE0Ni43NTJDMTYwLjU5MSAxNDUuMDE0IDE2Mi45ODEgMTQ0IDE2NS40NDMgMTQ0SDM5NS4yOTNDMzk5LjQ5MyAxNDQgNDAxLjU5MyAxNDkuMDY5IDM5OC42MjQgMTUyLjAzOEwzNTMuMjE5IDE5Ny40NDNDMzUxLjQ4MSAxOTkuMTgxIDM0OS4wOTEgMjAwLjE5NSAzNDYuNTU3IDIwMC4xOTVIMTE2LjcwN0MxMTIuNTA3IDIwMC4xOTUgMTEwLjQwNyAxOTUuMTI2IDExMy4zNzYgMTkyLjE1N0wxNTguNzgxIDE0Ni43NTJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0zNTMuMjE5IDIzMC45NzNDMzUxLjQ4MSAyMjkuMjM1IDM0OS4wOTEgMjI4LjIyMSAzNDYuNTU3IDIyOC4yMjFIMTE2LjcwN0MxMTIuNTA3IDIyOC4yMjEgMTEwLjQwNyAyMzMuMjkgMTEzLjM3NiAyMzYuMjU5TDE1OC43ODEgMjgxLjY2NEMxNjAuNTE5IDI4My40MDIgMTYyLjkwOSAyODQuNDE2IDE2NS40NDMgMjg0LjQxNkgzOTUuMjkzQzM5OS40OTMgMjg0LjQxNiA0MDEuNTkzIDI3OS4zNDcgMzk4LjYyNCAyNzYuMzc4TDM1My4yMTkgMjMwLjk3M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yMjk4XzI5NSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzIyOThfMjk1IiB4MT0iMzczLjMzNiIgeTE9IjExNi44NzYiIHgyPSIyMTQuMjYxIiB5Mj0iNDIxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjI5OF8yOTUiIHgxPSIzMDMuNzgiIHkxPSI4MC41NjIyIiB4Mj0iMTQ0LjcwNSIgeTI9IjM4NS4yNTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZBMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEQzFGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIyOThfMjk1IiB4MT0iMzM4LjMzNiIgeTE9Ijk4LjYwNDEiIHgyPSIxNzkuMjYyIiB5Mj0iNDAzLjI5NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIyOThfMjk1Ij4KPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMjUuNzIyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyIDE0NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
                rpc: [
                    "https://api.testnet.solana.com/"
                ],
                nativeCurrency: {
                    name: "Solana",
                    symbol: "Sol",
                    decimals: 9
                }
            },
            devnet: {
                id: 103,
                name: "Solana Devnet",
                base: "svm",
                type: "devnet",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjI5OF8yOTUpIj4KPHBhdGggZD0iTTE1OC43ODEgMzE2LjI3OEMxNjAuNTE5IDMxNC41NCAxNjIuOTA5IDMxMy41MjYgMTY1LjQ0MyAzMTMuNTI2SDM5NS4yOTNDMzk5LjQ5MyAzMTMuNTI2IDQwMS41OTMgMzE4LjU5NiAzOTguNjI0IDMyMS41NjVMMzUzLjIxOSAzNjYuOTdDMzUxLjQ4MSAzNjguNzA4IDM0OS4wOTEgMzY5LjcyMSAzNDYuNTU3IDM2OS43MjFIMTE2LjcwN0MxMTIuNTA3IDM2OS43MjEgMTEwLjQwNyAzNjQuNjUyIDExMy4zNzYgMzYxLjY4M0wxNTguNzgxIDMxNi4yNzhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0xNTguNzgxIDE0Ni43NTJDMTYwLjU5MSAxNDUuMDE0IDE2Mi45ODEgMTQ0IDE2NS40NDMgMTQ0SDM5NS4yOTNDMzk5LjQ5MyAxNDQgNDAxLjU5MyAxNDkuMDY5IDM5OC42MjQgMTUyLjAzOEwzNTMuMjE5IDE5Ny40NDNDMzUxLjQ4MSAxOTkuMTgxIDM0OS4wOTEgMjAwLjE5NSAzNDYuNTU3IDIwMC4xOTVIMTE2LjcwN0MxMTIuNTA3IDIwMC4xOTUgMTEwLjQwNyAxOTUuMTI2IDExMy4zNzYgMTkyLjE1N0wxNTguNzgxIDE0Ni43NTJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjI5OF8yOTUpIi8+CjxwYXRoIGQ9Ik0zNTMuMjE5IDIzMC45NzNDMzUxLjQ4MSAyMjkuMjM1IDM0OS4wOTEgMjI4LjIyMSAzNDYuNTU3IDIyOC4yMjFIMTE2LjcwN0MxMTIuNTA3IDIyOC4yMjEgMTEwLjQwNyAyMzMuMjkgMTEzLjM3NiAyMzYuMjU5TDE1OC43ODEgMjgxLjY2NEMxNjAuNTE5IDI4My40MDIgMTYyLjkwOSAyODQuNDE2IDE2NS40NDMgMjg0LjQxNkgzOTUuMjkzQzM5OS40OTMgMjg0LjQxNiA0MDEuNTkzIDI3OS4zNDcgMzk4LjYyNCAyNzYuMzc4TDM1My4yMTkgMjMwLjk3M1oiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yMjk4XzI5NSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzIyOThfMjk1IiB4MT0iMzczLjMzNiIgeTE9IjExNi44NzYiIHgyPSIyMTQuMjYxIiB5Mj0iNDIxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjI5OF8yOTUiIHgxPSIzMDMuNzgiIHkxPSI4MC41NjIyIiB4Mj0iMTQ0LjcwNSIgeTI9IjM4NS4yNTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZBMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEQzFGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIyOThfMjk1IiB4MT0iMzM4LjMzNiIgeTE9Ijk4LjYwNDEiIHgyPSIxNzkuMjYyIiB5Mj0iNDAzLjI5NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRkEzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMUZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIyOThfMjk1Ij4KPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMjUuNzIyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyIDE0NCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
                rpc: [
                    "https://api.devnet.solana.com/"
                ],
                nativeCurrency: {
                    name: "Solana",
                    symbol: "Sol",
                    decimals: 9
                }
            }
        },
    }
};


export function getChain(name: string): { mainnet?: Chain | undefined; testnet?: { [key: string]: Chain | undefined; } | undefined; devnet?: { [key: string]: Chain | undefined; } | undefined; } | undefined {
    return Object.values(chainlist)
        .find((network) => network?.mainnet?.name?.toLowerCase()?.includes(name))
}

export function getChainsByType(type: "mainnet" | "testnet" | "devnet"): Chain[] {
    return Object.values(chainlist)
        .flatMap((network) => typeof network[type] === 'object' && network[type] !== null
            ? Object.values(network[type] as { [key: string]: Chain })
            : Array.isArray(network[type])
                ? network[type]
                : network[type] ? [network[type]] : [])
        .filter((network): network is Chain => Boolean(network));
}

export function getChainByName(name: string): Chain | undefined {
    return Object.values(chainlist)
        .flatMap(network => [network?.mainnet, ...(network?.testnet ? Object.values(network?.testnet) : [])])
        .filter(f => f)
        .find(f => f?.name?.toLowerCase()?.includes(name));
}

export function getChainById(id: number): Chain | undefined {
    return Object.values(chainlist)
        .flatMap(network => [network?.mainnet, ...(network?.testnet ? Object.values(network?.testnet) : [])])
        .filter(f => f)
        .find(f => f?.id === id);
}


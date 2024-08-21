import { CoinbaseWalletAdapter, MetaMaskWalletAdapter, PhantomWalletAdapter, RainbowWalletAdapter, TrustWalletAdapter, ZerionWalletAdapter } from "providers";
import { Providers } from "types";

const detect = (wallet: string) => ((new (window as any)()) as any)?.ethereum?.providers?.find((p: any) => p[`${wallet}`]);

export const providers: Providers = {
	MetaMask: {
		name: "MetaMask",
		logo: "data:image/svg+xml,%3Csvg%20fill%3D%22none%22%20height%3D%2233%22%20viewBox%3D%220%200%2035%2033%22%20width%3D%2235%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%22.25%22%3E%3Cpath%20d%3D%22m32.9582%201-13.1341%209.7183%202.4424-5.72731z%22%20fill%3D%22%23e17726%22%20stroke%3D%22%23e17726%22%2F%3E%3Cg%20fill%3D%22%23e27625%22%20stroke%3D%22%23e27625%22%3E%3Cpath%20d%3D%22m2.66296%201%2013.01714%209.809-2.3254-5.81802z%22%2F%3E%3Cpath%20d%3D%22m28.2295%2023.5335-3.4947%205.3386%207.4829%202.0603%202.1436-7.2823z%22%2F%3E%3Cpath%20d%3D%22m1.27281%2023.6501%202.13055%207.2823%207.46994-2.0603-3.48166-5.3386z%22%2F%3E%3Cpath%20d%3D%22m10.4706%2014.5149-2.0786%203.1358%207.405.3369-.2469-7.969z%22%2F%3E%3Cpath%20d%3D%22m25.1505%2014.5149-5.1575-4.58704-.1688%208.05974%207.4049-.3369z%22%2F%3E%3Cpath%20d%3D%22m10.8733%2028.8721%204.4819-2.1639-3.8583-3.0062z%22%2F%3E%3Cpath%20d%3D%22m20.2659%2026.7082%204.4689%202.1639-.6105-5.1701z%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22m24.7348%2028.8721-4.469-2.1639.3638%202.9025-.039%201.231z%22%20fill%3D%22%23d5bfb2%22%20stroke%3D%22%23d5bfb2%22%2F%3E%3Cpath%20d%3D%22m10.8732%2028.8721%204.1572%201.9696-.026-1.231.3508-2.9025z%22%20fill%3D%22%23d5bfb2%22%20stroke%3D%22%23d5bfb2%22%2F%3E%3Cpath%20d%3D%22m15.1084%2021.7842-3.7155-1.0884%202.6243-1.2051z%22%20fill%3D%22%23233447%22%20stroke%3D%22%23233447%22%2F%3E%3Cpath%20d%3D%22m20.5126%2021.7842%201.0913-2.2935%202.6372%201.2051z%22%20fill%3D%22%23233447%22%20stroke%3D%22%23233447%22%2F%3E%3Cpath%20d%3D%22m10.8733%2028.8721.6495-5.3386-4.13117.1167z%22%20fill%3D%22%23cc6228%22%20stroke%3D%22%23cc6228%22%2F%3E%3Cpath%20d%3D%22m24.0982%2023.5335.6366%205.3386%203.4946-5.2219z%22%20fill%3D%22%23cc6228%22%20stroke%3D%22%23cc6228%22%2F%3E%3Cpath%20d%3D%22m27.2291%2017.6507-7.405.3369.6885%203.7966%201.0913-2.2935%202.6372%201.2051z%22%20fill%3D%22%23cc6228%22%20stroke%3D%22%23cc6228%22%2F%3E%3Cpath%20d%3D%22m11.3929%2020.6958%202.6242-1.2051%201.0913%202.2935.6885-3.7966-7.40495-.3369z%22%20fill%3D%22%23cc6228%22%20stroke%3D%22%23cc6228%22%2F%3E%3Cpath%20d%3D%22m8.392%2017.6507%203.1049%206.0513-.1039-3.0062z%22%20fill%3D%22%23e27525%22%20stroke%3D%22%23e27525%22%2F%3E%3Cpath%20d%3D%22m24.2412%2020.6958-.1169%203.0062%203.1049-6.0513z%22%20fill%3D%22%23e27525%22%20stroke%3D%22%23e27525%22%2F%3E%3Cpath%20d%3D%22m15.797%2017.9876-.6886%203.7967.8704%204.4833.1949-5.9087z%22%20fill%3D%22%23e27525%22%20stroke%3D%22%23e27525%22%2F%3E%3Cpath%20d%3D%22m19.8242%2017.9876-.3638%202.3584.1819%205.9216.8704-4.4833z%22%20fill%3D%22%23e27525%22%20stroke%3D%22%23e27525%22%2F%3E%3Cpath%20d%3D%22m20.5127%2021.7842-.8704%204.4834.6236.4406%203.8584-3.0062.1169-3.0062z%22%20fill%3D%22%23f5841f%22%20stroke%3D%22%23f5841f%22%2F%3E%3Cpath%20d%3D%22m11.3929%2020.6958.104%203.0062%203.8583%203.0062.6236-.4406-.8704-4.4834z%22%20fill%3D%22%23f5841f%22%20stroke%3D%22%23f5841f%22%2F%3E%3Cpath%20d%3D%22m20.5906%2030.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026%201.231-4.1572-1.9696%201.4551%201.1921%202.9489%202.0344h5.0536l2.962-2.0344%201.442-1.1921z%22%20fill%3D%22%23c0ac9d%22%20stroke%3D%22%23c0ac9d%22%2F%3E%3Cpath%20d%3D%22m20.2659%2026.7082-.6236-.4406h-3.6635l-.6236.4406-.3508%202.9025.3248-.2851h4.9626l.3378.2851z%22%20fill%3D%22%23161616%22%20stroke%3D%22%23161616%22%2F%3E%3Cpath%20d%3D%22m33.5168%2011.3532%201.1043-5.36447-1.6629-4.98873-12.6923%209.3944%204.8846%204.1205%206.8983%202.0085%201.52-1.7752-.6626-.4795%201.0523-.9588-.8054-.622%201.0523-.8034z%22%20fill%3D%22%23763e1a%22%20stroke%3D%22%23763e1a%22%2F%3E%3Cpath%20d%3D%22m1%205.98873%201.11724%205.36447-.71451.5313%201.06527.8034-.80545.622%201.05228.9588-.66255.4795%201.51997%201.7752%206.89835-2.0085%204.8846-4.1205-12.69233-9.3944z%22%20fill%3D%22%23763e1a%22%20stroke%3D%22%23763e1a%22%2F%3E%3Cpath%20d%3D%22m32.0489%2016.5234-6.8983-2.0085%202.0786%203.1358-3.1049%206.0513%204.1052-.0519h6.1318z%22%20fill%3D%22%23f5841f%22%20stroke%3D%22%23f5841f%22%2F%3E%3Cpath%20d%3D%22m10.4705%2014.5149-6.89828%202.0085-2.29944%207.1267h6.11883l4.10519.0519-3.10487-6.0513z%22%20fill%3D%22%23f5841f%22%20stroke%3D%22%23f5841f%22%2F%3E%3Cpath%20d%3D%22m19.8241%2017.9876.4417-7.5932%202.0007-5.4034h-8.9119l2.0006%205.4034.4417%207.5932.1689%202.3842.013%205.8958h3.6635l.013-5.8958z%22%20fill%3D%22%23f5841f%22%20stroke%3D%22%23f5841f%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
		website: "https://metamask.io/",
		url: 'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
		adapter: (config?: any) => (new MetaMaskWalletAdapter(config)),
	},
	'Coinbase Wallet': {
		name: "Coinbase Wallet",
		logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI4IDU2YzE1LjQ2NCAwIDI4LTEyLjUzNiAyOC0yOFM0My40NjQgMCAyOCAwIDAgMTIuNTM2IDAgMjhzMTIuNTM2IDI4IDI4IDI4WiIgZmlsbD0iIzFCNTNFNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNyAyOGMwIDExLjU5OCA5LjQwMiAyMSAyMSAyMXMyMS05LjQwMiAyMS0yMVMzOS41OTggNyAyOCA3IDcgMTYuNDAyIDcgMjhabTE3LjIzNC02Ljc2NmEzIDMgMCAwIDAtMyAzdjcuNTMzYTMgMyAwIDAgMCAzIDNoNy41MzNhMyAzIDAgMCAwIDMtM3YtNy41MzNhMyAzIDAgMCAwLTMtM2gtNy41MzNaIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
		website: "https://www.coinbase.com/wallet",
		url: 'https://chromewebstore.google.com/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
		adapter: (config?: any) => new CoinbaseWalletAdapter.evm(config),
	},
	'Trust Wallet': {
		name: "Trust Wallet",
		logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAMAAACj+uTiAAAAilBMVEVHcEwEF/8FAP8FAP8GC/8OS/QFBP8FAP8AcP9D+ZkYtt1E+5cFA/8EG/8PhO4DEf8AWP9C95wAbP8x3bVF/JVG/pIBNP8BKv9G+5ZH/JVF+pYEAP8CU/4Ajv8BNf8BRP8Afv8CHP8CKf8AY/8ED/8bvdYSsOMz4bEr1L487aQKpO8jycoEmvoYZOMYbsxeAAAAG3RSTlMANI/yGAjLaP79kS+9UZnh349nkdB4tc2XhtYXSrr5AAAA8klEQVQokW3S23KDIBCAYVARbdSkOfSESlRSNej7v14XEAXT/875YJhxF6E1TIvbAb0U0Thkc5pefcQ0Zqp5HMc0/fk+EHM6gNOmue97jdcvuEnZ1jwMg8V3T0oppcWdPKAFL778Qhrl4Aufnk+DUr75UlUToNKHL3WlMriTO2Rw2kmSJBYLT9qu6ywWKHel7IwBnlF03KQpVUYxQpkjnPPFTvC7sSN1zbnRsxpDvIqoVcpOekLbJdFCGnMz0mCVpmk1fizDJtkmjcJPYveA2KeEUHiMnM1xSMQOuG+xjCC/fFkg+s8uBiELg+gV9EJi5+sP+CM42THdUC0AAAAASUVORK5CYII=",
		website: 'https://trustwallet.com/',
		url: 'https://chromewebstore.google.com/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
		adapter: (config?: any) => new TrustWalletAdapter.evm(config),
	},
	Zerion: {
		name: "Zerion",
		logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAOVBMVEVHcEwkYe0kYe0kYe0kYe0kYe0kYe0kYe4kYe0SWu03bO+esfVjh/H////h5/wGVezJ1PqEn/OsvfdeUL6xAAAACXRSTlMAOIfD7v9gFuE1IrhZAAAAv0lEQVR4AX2TVwLDIAxDWcoGkd7/rh04GLp4v95DRrHOByB4Z80nU4ASJtMzL3hjmbuM+MIObGqd8RPJLPXWDqlb+sSLbe848OLVcyhxe+xILBNpN+ytx3r15CAQudoyUXDGo8IjiZEQvJQUVp6aVIpC4Ytb3IlKMzLHvJFcoUhabTeDUII2tEVhb6G+jsLUpiQEdy1hPWMjb/UwUpTxjbo+M0nkreMsZSc92dqg3GwZHnv0JuMHG7/m+KmHcngA6zASdhvGgR8AAAAASUVORK5CYII=",
		website: "https://zerion.io/",
		url: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
		adapter: (config?: any) => new ZerionWalletAdapter(config),
	},
	Rainbow: {
		name: "Rainbow",
		logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0ibm9uZSI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDMydjMySDB6Ii8+PHBhdGggZmlsbD0idXJsKCNjKSIgZD0iTTUuMzMzIDEwLjEzM2gxLjZjOC4yNDggMCAxNC45MzQgNi42ODYgMTQuOTM0IDE0LjkzNHYxLjZoMy4yYTEuNiAxLjYgMCAwIDAgMS42LTEuNmMwLTEwLjg5OS04LjgzNS0xOS43MzQtMTkuNzM0LTE5LjczNGExLjYgMS42IDAgMCAwLTEuNiAxLjZ2My4yWiIvPjxwYXRoIGZpbGw9InVybCgjZCkiIGQ9Ik0yMi40IDI1LjA2N2g0LjI2N2ExLjYgMS42IDAgMCAxLTEuNiAxLjZIMjIuNHYtMS42WiIvPjxwYXRoIGZpbGw9InVybCgjZSkiIGQ9Ik02LjkzMyA1LjMzM1Y5LjZoLTEuNlY2LjkzM2ExLjYgMS42IDAgMCAxIDEuNi0xLjZaIi8+PHBhdGggZmlsbD0idXJsKCNmKSIgZD0iTTUuMzMzIDkuNmgxLjZjOC41NDIgMCAxNS40NjcgNi45MjUgMTUuNDY3IDE1LjQ2N3YxLjZoLTQuOHYtMS42YzAtNS44OTEtNC43NzYtMTAuNjY3LTEwLjY2Ny0xMC42NjdoLTEuNlY5LjZaIi8+PHBhdGggZmlsbD0idXJsKCNnKSIgZD0iTTE4LjEzMyAyNS4wNjdIMjIuNHYxLjZoLTQuMjY3di0xLjZaIi8+PHBhdGggZmlsbD0idXJsKCNoKSIgZD0iTTUuMzMzIDEzLjg2N1Y5LjZoMS42djQuMjY3aC0xLjZaIi8+PHBhdGggZmlsbD0idXJsKCNpKSIgZD0iTTUuMzMzIDE2LjUzM2ExLjYgMS42IDAgMCAwIDEuNiAxLjYgNi45MzMgNi45MzMgMCAwIDEgNi45MzQgNi45MzQgMS42IDEuNiAwIDAgMCAxLjYgMS42aDIuNjY2di0xLjZjMC02LjE4Ni01LjAxNC0xMS4yLTExLjItMTEuMmgtMS42djIuNjY2WiIvPjxwYXRoIGZpbGw9InVybCgjaikiIGQ9Ik0xMy44NjcgMjUuMDY3aDQuMjY2djEuNmgtMi42NjZhMS42IDEuNiAwIDAgMS0xLjYtMS42WiIvPjxwYXRoIGZpbGw9InVybCgjaykiIGQ9Ik02LjkzMyAxOC4xMzNhMS42IDEuNiAwIDAgMS0xLjYtMS42di0yLjY2NmgxLjZ2NC4yNjZaIi8+PC9nPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKC05MCAxNiA5LjA2Nykgc2NhbGUoMTkuNzMzMykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii43NyIgc3RvcC1jb2xvcj0iI0ZGNDAwMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg3NTRDOSIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJmIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoLTkwIDE2IDkuMDY3KSBzY2FsZSgxNS40NjY3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjcyNCIgc3RvcC1jb2xvcj0iI0ZGRjcwMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTkwMSIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJpIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoLTkwIDE2IDkuMDY3KSBzY2FsZSgxMS4yKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjU5NSIgc3RvcC1jb2xvcj0iIzBBRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAxREE0MCIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJqIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoNC41MzMzMyAwIDAgMTIuMDg4OSAxMy42IDI1Ljg2NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMEFGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDFEQTQwIi8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImsiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIC00LjUzMzMzIDg1Ljk2NTQgMCA2LjEzMyAxOC40KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiMwQUYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMURBNDAiLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjE2IiB4Mj0iMTYiIHkxPSIwIiB5Mj0iMzIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMTc0Mjk5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDAxRTU5Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImQiIHgxPSIyMi4xMzMiIHgyPSIyNi42NjciIHkxPSIyNS44NjciIHkyPSIyNS44NjciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRkY0MDAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjODc1NEM5Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImUiIHgxPSI2LjEzMyIgeDI9IjYuMTMzIiB5MT0iNS4zMzMiIHkyPSI5Ljg2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM4NzU0QzkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjQwMDAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjE4LjEzMyIgeDI9IjIyLjQiIHkxPSIyNS44NjciIHkyPSIyNS44NjciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGNzAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY5OTAxIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImgiIHgxPSI2LjEzMyIgeDI9IjYuMTMzIiB5MT0iMTMuODY3IiB5Mj0iOS42IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRjcwMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTkwMSIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDMydjMySDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+",
		website: "https://rainbow.me",
		url: 'https://chromewebstore.google.com/detail/rainbow/opfgelmcmbiajamepnmloijbpoleiama',
		adapter: (config?: any) => new RainbowWalletAdapter(config),
	},
	Phantom: {
		name: "Phantom",
		logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAXVBMVEX18v/28//39P/59v/x7v759//b1frAt/Wrn/KmmfGonPK3rfTRyviqnvLl4PytovLLw/fOx/jW0Pm8svWpnPLFvPailfHf2fvv6/79+//r5/25rvTp5f2xpvPHv/d84nSZAAAA7UlEQVR4Aa2RBZbEIBAFoRsSPpOO+8j9j7kRGOPt0ymcwlE/Rf8niFkZsqRSmLLcAf6S2WQWFQIR55wg509ny8q7CGr+cA3EvYDRL8c5jk6BP5Jv6eU6f7qLztBx4/uBo7N52M4XzOPEM6SLkgu4E8mXdayX6SWpjG6benXSd7KNirJ6O+de7bdBzSm37V0CSlIb2sCl9DpM7FMXb8KVpBLrMVPf4qryKvrBnkdtfeg8V/B32apaxbMGV/jjOx7A3XxKwZxBBIM1RcbBKZqwL9bfmIaqm6zSRB+fBQyGthpz7H/ZeVVxoRSt1Y/5Ay2oD2Ds/EUpAAAAAElFTkSuQmCC",
		website: "https://phantom.app",
		url: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
		adapter: (config?: any) => new PhantomWalletAdapter.evm(config),
	},
};

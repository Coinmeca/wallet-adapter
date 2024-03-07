import { Chain } from '@rainbow-me/rainbowkit';
import * as evm from './evm';
import * as svm from './svm';

const adapters = { evm, svm };
const useAdapters = (config?: any) =>
    Object.assign({}, ...Object.values(adapters).map((a, i) => ({ [Object.keys(adapters)[i]]: { ...a, adapter: a.adapter(config) } })));

export { evm, svm, useAdapters }
import booToken from "./BooToken.json";
import lifeToken from "./LifeToken.json";
import IWETH from "./IWETH.json";
import swapToken from "./SwapToken.json";

// booToken 0x9852795dbb01913439f534b4984fBf74aC8AfA12
// lifeToken 0x889D9A5AF83525a2275e41464FAECcCb3337fF60
// swapToken 0xf274De14171Ab928A5Ec19928cE35FaD91a42B64
// swapMultihop 0xcb0A9835CDf63c84FE80Fcc59d91d7505871c98B

export const BooTokenAddress = "0x9852795dbb01913439f534b4984fBf74aC8AfA12";
export const BooTokenABI = booToken.abi;

export const LifeTokenAddress = "0x889D9A5AF83525a2275e41464FAECcCb3337fF60";
export const LifeTokenABI = lifeToken.abi;

export const SingleSwapTokenAddress = "0xf274De14171Ab928A5Ec19928cE35FaD91a42B64";
export const SingleSwapTokenABI = swapToken.abi;

export const SwapMultihopAddress = "0xcb0A9835CDf63c84FE80Fcc59d91d7505871c98B";

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export const IWETHABI = IWETH.abi;

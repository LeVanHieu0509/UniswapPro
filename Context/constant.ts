import booToken from "./BooToken.json";
import lifeToken from "./LifeToken.json";
import IWETH from "./IWETH.json";
import swapToken from "./SwapToken.json";
import SwapMultihop from "./SwapMultihop.json";

// booToken 0x9852795dbb01913439f534b4984fBf74aC8AfA12
// lifeToken 0x889D9A5AF83525a2275e41464FAECcCb3337fF60
// swapToken 0xf274De14171Ab928A5Ec19928cE35FaD91a42B64
// swapMultihop 0xcb0A9835CDf63c84FE80Fcc59d91d7505871c98B

export const BooTokenAddress = "0xcb0A9835CDf63c84FE80Fcc59d91d7505871c98B";
export const BooTokenABI = booToken.abi;

export const LifeTokenAddress = "0xFD296cCDB97C605bfdE514e9810eA05f421DEBc2";
export const LifeTokenABI = lifeToken.abi;

export const SingleSwapTokenAddress = "0x8b9d5A75328b5F3167b04B42AD00092E7d6c485c";
export const SingleSwapTokenABI = swapToken.abi;

export const SwapMultihopAddress = "0x9BcA065E19b6d630032b53A8757fB093CbEAfC1d";
export const SwapMultihopABI = SwapMultihop.abi;

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

export const IDAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const IDAIABI = IWETH.abi;

export const IUSDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const IUSDCABI = IWETH.abi;

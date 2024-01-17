import IWETH from "./IWETH.json";

// booToken 0xAE246E208ea35B3F23dE72b697D47044FC594D5F
// lifeToken 0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65
// swapToken 0x084815D1330eCC3eF94193a19Ec222C0C73dFf2d
// swapMultihop 0x76a999d5F7EFDE0a300e710e6f52Fb0A4b61aD58
// userStorageData 0x02e8910B3B89690d4aeC9fcC0Ae2cD16fB6A4828

const artifacts = {
  booToken: require("../artifacts/contracts/ERC20Boo.sol/BooToken.json"),
  lifeToken: require("../artifacts/contracts/ERC20Life.sol/LifeToken.json"),
  swapToken: require("../artifacts/contracts/SwapToken.sol/SwapToken.json"),
  SwapMultihop: require("../artifacts/contracts/SwapMultiHop.sol/SwapMultihop.json"),
  IWETH: require("../artifacts/contracts/SwapToken.sol/SwapToken.json"),
  UserStorageData: require("../artifacts/contracts/storeUserData.sol/UserStorageData.json"),
};

export const BooTokenAddress = "0xAE246E208ea35B3F23dE72b697D47044FC594D5F";
export const BooTokenABI = artifacts.booToken.abi;

export const LifeTokenAddress = "0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65";
export const LifeTokenABI = artifacts.lifeToken.abi;

export const SingleSwapTokenAddress = "0x084815D1330eCC3eF94193a19Ec222C0C73dFf2d";
export const SingleSwapTokenABI = artifacts.swapToken.abi;

export const SwapMultihopAddress = "0x76a999d5F7EFDE0a300e710e6f52Fb0A4b61aD58";
export const SwapMultihopABI = artifacts.SwapMultihop.abi;

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

export const IDAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const IDAIABI = IWETH.abi;

export const IUSDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const IUSDCABI = IWETH.abi;

//USER STORAGE DATA
export const UserStorageDataAddress = "0x02e8910B3B89690d4aeC9fcC0Ae2cD16fB6A4828";
export const UserStorageDataABI = artifacts.UserStorageData.abi;

export const PopUpTokenAddress = "0x564Db7a11653228164FD03BcA60465270E67b3d7";
export const RayyanTokenAddress = "0x9abb5861e3a1eDF19C51F8Ac74A81782e94F8FdC";
export const ShoaibTokenAddress = "0x484242986F57dFcA98EeC2C78427931C63F1C4ce";

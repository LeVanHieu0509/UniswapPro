import IWETH from "./IWETH.json";
require("dotenv").config();

const artifacts = {
  booToken: require("../artifacts/contracts/ERC20Boo.sol/BooToken.json"),
  lifeToken: require("../artifacts/contracts/ERC20Life.sol/LifeToken.json"),
  swapToken: require("../artifacts/contracts/SwapToken.sol/SwapToken.json"),
  SwapMultihop: require("../artifacts/contracts/SwapMultiHop.sol/SwapMultihop.json"),
  IWETH: require("../artifacts/contracts/SwapToken.sol/SwapToken.json"),
  UserStorageData: require("../artifacts/contracts/storeUserData.sol/UserStorageData.json"),
};

export const processCus = {
  TOKEN: {
    TETHER_ADDRESS: "0x499AA73A1D27e54B33E7DB05ffd22854EC70257E",
    USDC_ADDRESS: "0x4c04377f90Eb1E42D845AB21De874803B8773669",
    WRAPPED_BITCOIN_ADDRESS: "0xf93b0549cD50c849D792f0eAE94A598fA77C7718",
    POPUP_ADDRESS: "0x6fFa22292b86D678fF6621eEdC9B15e68dC44DcD",
    RAYYAN_ADDRESS: "0x11632F9766Ee9d9317F95562a6bD529652ead78f",
    SHOAIB_ADDRESS: "0x4f1F87d512650f32bf9949C4c5Ef37a3cc891C6D",
  },
  POOL: {
    WETH_ADDRESS: "0x4Dd5336F3C0D70893A7a86c6aEBe9B953E87c891",
    FACTORY_ADDRESS: "0x91A1EeE63f300B8f41AE6AF67eDEa2e2ed8c3f79",
    SWAP_ROUTER_ADDRESS: "0xBe6Eb4ACB499f992ba2DaC7CAD59d56DA9e0D823",
    NFT_DESCRIPTOR_ADDRESS: "0x54287AaB4D98eA51a3B1FBceE56dAf27E04a56A6",
    POSITION_DESCRIPTOR_ADDRESS: "0xE401FBb0d6828e9f25481efDc9dd18Da9E500983",
    POSITION_MANAGER_ADDRESS: "0xb6aA91E8904d691a10372706e57aE1b390D26353",
  },
  DEPLOY: {
    BOO_TOKEN: "0x59c7D03d2E9893FB7bAa89dA50a9452e1e9B8b90",
    LIFE_TOKEN: "0x834Ea01e45F9b5365314358159d92d134d89feEb",
    SWAP_TOKEN: "0x8D75F9F7f4F4C4eFAB9402261bC864f21DF0c649",
    SWAP_MULTI_HOP_TOKEN: "0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc",
    USER_STORAGE_DATA: "0xFcCa971FE9Ee20C1Cf22596E700aA993D8fD19c5",
  },
  TOKEN_DEPLOYED: {
    IWETH_ADDRESS: "0xCA87833e830652C2ab07E1e03eBa4F2c246D3b58",
    IDAI_ADDRESS: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    IUSDC_ADDRESS: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
};

export const BooTokenAddress = processCus.DEPLOY.BOO_TOKEN;
export const BooTokenABI = artifacts.booToken.abi;

export const LifeTokenAddress = processCus.DEPLOY.LIFE_TOKEN;
export const LifeTokenABI = artifacts.lifeToken.abi;

export const SingleSwapTokenAddress = processCus.DEPLOY.SWAP_TOKEN;
export const SingleSwapTokenABI = artifacts.swapToken.abi;

export const SwapMultihopAddress = processCus.DEPLOY.SWAP_MULTI_HOP_TOKEN;
export const SwapMultihopABI = artifacts.SwapMultihop.abi;

export const IWETHAddress = "0xCA87833e830652C2ab07E1e03eBa4F2c246D3b58";
export const IWETHABI = IWETH.abi;

export const IDAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const IDAIABI = IWETH.abi;

export const IUSDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const IUSDCABI = IWETH.abi;

//USER STORAGE DATA
export const UserStorageDataAddress = processCus.DEPLOY.USER_STORAGE_DATA; //UserStorageDataAddress
export const UserStorageDataABI = artifacts.UserStorageData.abi;

export const PopUpTokenAddress = processCus.TOKEN.POPUP_ADDRESS;

export const RayyanTokenAddress = processCus.TOKEN.RAYYAN_ADDRESS;
export const ShoaibTokenAddress = processCus.TOKEN.SHOAIB_ADDRESS;

export const UsdtTokenAddress = processCus.TOKEN.TETHER_ADDRESS;
export const UsdcTokenAddress = processCus.TOKEN.USDC_ADDRESS;

export const FACTORY_ADDRESS = processCus.POOL.FACTORY_ADDRESS;
export const SWAP_ROUTER_ADDRESS = processCus.POOL.SWAP_ROUTER_ADDRESS;
export const NFT_DESCRIPTOR_ADDRESS = processCus.POOL.NFT_DESCRIPTOR_ADDRESS;
export const POSITION_DESCRIPTOR_ADDRESS = processCus.POOL.POSITION_DESCRIPTOR_ADDRESS;
export const POSITION_MANAGER_ADDRESS = processCus.POOL.POSITION_MANAGER_ADDRESS;

import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";
import { Pool, Position, nearestUsableTick } from "@uniswap/v3-sdk";

const WETH_ADDRESS = "0xd8A9159c111D0597AD1b475b8d7e5A217a1d1d05";
const FACTORY_ADDRESS = "0xCdb63c58b907e76872474A0597C5252eDC97c883";
const SWAP_ROUTER_ADDRESS = "0x15BB2cc3Ea43ab2658F7AaecEb78A9d3769BE3cb";
const NFT_DESCRIPTOR_ADDRESS = "0xa4d0806d597146df93796A38435ABB2a3cb96677";
const POSITION_DESCRIPTOR_ADDRESS = "0xAE246E208ea35B3F23dE72b697D47044FC594D5F";
const POSITION_MANAGER_ADDRESS = "0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65";

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),

  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
  WETH9: require("../../Context/WETH9.json"),
};

const getPoolData = async (poolContract) => {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(
      poolContract.tickSpacing(),
      poolContract.fee(),
      poolContract.liquidity(),
      poolContract.slot0()
    ),
  ]);

  return {
    tickSpacing,
    fee,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
};

export const addLiquidityExternal = async (
  tokenAddress1,
  tokenAddress2,
  poolAddress,
  poolFee,
  tokenAmount1,
  tokenAmount2
) => {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const accountAddress = await signer.getAddress();

  const token1Contract = new Contract(tokenAddress1, artifacts.WETH9.abi, provider);
  const token2Contract = new Contract(tokenAddress2, artifacts.WETH9.abi, provider);

  await token1Contract
    .connect(signer)
    .approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther(tokenAmount1.toString()));

  await token2Contract
    .connect(signer)
    .approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther(tokenAmount2.toString()));

  const poolContract = new Contract(poolAddress, artifacts.UniswapV3Pool.abi, provider);

  const { chainId } = await provider.getNetwork();

  //token1
  const token1Name = await token1Contract.name();
  const token1Symbol = await token1Contract.Symbol();
  const token1Decimals = await token1Contract.decimals();
  const token1Address = await token1Contract.address();

  //token2
  const token2Name = await token2Contract.name();
  const token2Symbol = await token2Contract.Symbol();
  const token2Decimals = await token2Contract.decimals();
  const token2Address = await token2Contract.address();

  const TokenA = new Token(chainId, token1Address, token1Decimals, token1Name, token1Symbol);
  const TokenB = new Token(chainId, token2Address, token2Decimals, token2Name, token2Symbol);

  const poolData = await getPoolData(poolContract);
  console.log({ poolData });

  const pool = new Pool(
    TokenA,
    TokenB,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  );

  const position = new Position({
    pool,
    liquidity: ethers.utils.parseEther("1"),
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
  });

  const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts;

  const params = {
    token0: tokenAddress1,
    token1: tokenAddress2,
    fee: poolData.fee,
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: 0,
    amount1Min: 0,
    recipient: accountAddress,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
  };

  const nofungiblePositionManager = new Contract(
    POSITION_MANAGER_ADDRESS,
    artifacts.NonfungiblePositionManager.abi,
    provider
  );

  const tx = await nofungiblePositionManager.connect(signer).mint(params, {
    gasLimit: "1000000",
  });

  const receipt = await tx.wait();
  return receipt;
};

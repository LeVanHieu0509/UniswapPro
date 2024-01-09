import { Token } from "@uniswap/sdk-core";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import { Pool } from "@uniswap/v3-sdk";
import { Contract } from "ethers";
import Web3Modal from "web3modal";
import ERC20 from "../../Context/ERC20Token.json";
import { ethers } from "ethers";

const getPoolData = async (poolContract, tokenAddress1, tokenAddress2) => {
  const [tickSpacing, fee, liquidity, slot0, factory, token0, token1, maxLiquidityPerTick] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
    poolContract.factory(),
    poolContract.token0(),
    poolContract.token1(),
    poolContract.maxLiquidityPerTick(),
  ]);

  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const token1Contract = new Contract(tokenAddress1, ERC20, provider);
  const token2Contract = new Contract(tokenAddress2, ERC20, provider);

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

  const poolExample = new Pool(TokenA, TokenB, fee, slot0[0].toString(), liquidity.toString(), slot0[1]);

  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity.toString(),
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
    factory,
    token0,
    token1,
    maxLiquidityPerTick,
    sqrtPriceX96: slot0[0],
    observationIndex: slot0[2],
    observationCardinality: slot0[3],
    observationCardinalityNext: slot0[4],
    feeProtocol: slot0[5],
    unlocked: slot0[6],
    poolExample,
  };
};

export const getLiquidityData = async (poolAddress, tokenAddress1, tokenAddress2) => {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const poolContract = new Contract(poolAddress, UniswapV3Pool.abi, provider);
  const poolData = await getPoolData(poolContract, tokenAddress1, tokenAddress2);

  return poolData;
};

// pool
USDT_USDC_500 = "0xEfE2a82217e83B89718301B2Dd88a90DEa343d0f";
SHOAIB_RAY = "0x898DF30179628b1C757eA9D668f2230087663A52";

const { Token } = require("@uniswap/sdk-core");
const UniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const { Pool } = require("@uniswap/v3-sdk");
const { Contract } = require("ethers");

async function getPoolData(poolContract) {
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

  const TokenA = new Token(3, token0, 18, "SHO", "Shoaib");
  const TokenB = new Token(3, token1, 18, "RAY", "Rayyan");

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
}

async function main() {
  const provider = waffle.provider;
  const poolContract = new Contract(SHOAIB_RAY, UniswapV3Pool.abi, provider);
  const poolData = await getPoolData(poolContract);
  console.log("poolData", poolData);
}

/*
npx hardhat run --network localhost scripts/checkLiquidity.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

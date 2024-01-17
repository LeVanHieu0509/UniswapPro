const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Rayyan: require("../artifacts/contracts/Rayyan.sol/Rayyan.json"),
  Shoaib: require("../artifacts/contracts/Shoaib.sol/Shoaib.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

const { Contract } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");
const { POSITION_MANAGER_ADDRESS, RAYYAN_ADDRESS, SHOAIB_ADDRESS, SHOAIB_RAY } = require("../constants");

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

async function main() {
  const [owner, signer2] = await ethers.getSigners();
  const provider = waffle.provider;
  console.log({ provider, owner });
  //   const usdtContract = new Contract(TETHER_ADDRESS, artifacts.Usdt.abi, provider);
  //   const usdcContract = new Contract(USDC_ADDRESS, artifacts.Usdc.abi, provider);

  const shoaibContract = new Contract(SHOAIB_ADDRESS, artifacts.Shoaib.abi, provider);
  const rayyanContract = new Contract(RAYYAN_ADDRESS, artifacts.Rayyan.abi, provider);

  await shoaibContract.connect(signer2).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther("1000"));
  await rayyanContract.connect(signer2).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther("1000"));

  const poolContract = new Contract(SHOAIB_RAY, artifacts.UniswapV3Pool.abi, provider);

  const poolData = await getPoolData(poolContract);

  const ShoaibToken = new Token(31337, SHOAIB_ADDRESS, 18, "Shoaib", "Tether");
  const RayyanToken = new Token(31337, RAYYAN_ADDRESS, 18, "Rayyan", "Rayyanoin");

  const pool = new Pool(
    ShoaibToken,
    RayyanToken,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  );

  const position = new Position({
    pool: pool,
    liquidity: ethers.utils.parseEther("1"),
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
  });

  const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts;

  const params = {
    token0: SHOAIB_ADDRESS,
    token1: RAYYAN_ADDRESS,
    fee: poolData.fee,
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: 0,
    amount1Min: 0,
    recipient: signer2.address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
  };

  console.log({ params });
  const nonfungiblePositionManager = new Contract(
    POSITION_MANAGER_ADDRESS,
    artifacts.NonfungiblePositionManager.abi,
    provider
  );

  const tx = await nonfungiblePositionManager.connect(signer2).mint(params, { gasLimit: "1000000" });

  const receipt = await tx.wait();
  console.log({ receipt });
}

/*
                npx hardhat run --network localhost scripts/addLiquidity.js
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

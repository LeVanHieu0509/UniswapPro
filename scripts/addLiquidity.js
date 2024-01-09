// Uniswap contract addresses
WETH_ADDRESS = "0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65";
FACTORY_ADDRESS = "0x084815D1330eCC3eF94193a19Ec222C0C73dFf2d";
SWAP_ROUTER_ADDRESS = "0x76a999d5F7EFDE0a300e710e6f52Fb0A4b61aD58";
NFT_DESCRIPTOR_ADDRESS = "0x02e8910B3B89690d4aeC9fcC0Ae2cD16fB6A4828";
POSITION_DESCRIPTOR_ADDRESS = "0x564Db7a11653228164FD03BcA60465270E67b3d7";
POSITION_MANAGER_ADDRESS = "0x9abb5861e3a1eDF19C51F8Ac74A81782e94F8FdC";

// Pool addresses
USDT_USDC_500 = "0xEfE2a82217e83B89718301B2Dd88a90DEa343d0f";
SHOAIB_RAY = "0x898DF30179628b1C757eA9D668f2230087663A52";

// Token addresses
TETHER_ADDRESS = "0xEb0fCBB68Ca7Ba175Dc1D3dABFD618e7a3F582F6";
USDC_ADDRESS = "0xaE2abbDE6c9829141675fA0A629a675badbb0d9F";
WRAPPED_BITCOIN_ADDRESS = "0x8B342f4Ddcc71Af65e4D2dA9CD00cc0E945cFD12";
POPUP_ADDRESS = "0x484242986F57dFcA98EeC2C78427931C63F1C4ce";
RAYYAN_ADDRESS = "0x9DBb24B10502aD166c198Dbeb5AB54d2d13AfcFd";
SHOAIB_ADDRESS = "0xF8b299F87EBb62E0b625eAF440B73Cc6b7717dbd";

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Usdt: require("../artifacts/contracts/Tether.sol/Tether.json"),
  Usdc: require("../artifacts/contracts/UsdCoin.sol/UsdCoin.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

const { Contract } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");

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
  const [_owner, signer2] = await ethers.getSigners();
  const provider = ethers.provider;

  //   const usdtContract = new Contract(TETHER_ADDRESS, artifacts.Usdt.abi, provider);
  //   const usdcContract = new Contract(USDC_ADDRESS, artifacts.Usdc.abi, provider);

  const usdtContract = new Contract(SHOAIB_ADDRESS, artifacts.Usdt.abi, provider);
  const usdcContract = new Contract(RAYYAN_ADDRESS, artifacts.Usdc.abi, provider);

  await usdtContract.connect(signer2).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther("10000"));
  await usdcContract.connect(signer2).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther("10000"));

  const poolContract = new Contract(USDT_USDC_500, artifacts.UniswapV3Pool.abi, provider);

  const poolData = await getPoolData(poolContract);

  const UsdtToken = new Token(31337, SHOAIB_ADDRESS, 18, "USDT", "Tether");
  const UsdcToken = new Token(31337, RAYYAN_ADDRESS, 18, "USDC", "UsdCoin");

  const pool = new Pool(
    UsdtToken,
    UsdcToken,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  );

  const position = new Position({
    pool: pool,
    liquidity: ethers.utils.parseEther("100000"),
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

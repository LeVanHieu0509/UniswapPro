// Token addresses
TETHER_ADDRESS = "0x02e8910B3B89690d4aeC9fcC0Ae2cD16fB6A4828";
USDC_ADDRESS = "0x564Db7a11653228164FD03BcA60465270E67b3d7";
WRAPPED_BITCOIN_ADDRESS = "0x9abb5861e3a1eDF19C51F8Ac74A81782e94F8FdC";
POPUP_ADDRESS = "0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65";
RAYYAN_ADDRESS = "0x084815D1330eCC3eF94193a19Ec222C0C73dFf2d";
SHOAIB_ADDRESS = "0x76a999d5F7EFDE0a300e710e6f52Fb0A4b61aD58";

// Uniswap contract address
WETH_ADDRESS = "0xE2307e3710d108ceC7a4722a020a050681c835b3";
FACTORY_ADDRESS = "0xD28F3246f047Efd4059B24FA1fa587eD9fa3e77F";
SWAP_ROUTER_ADDRESS = "0x15F2ea83eB97ede71d84Bd04fFF29444f6b7cd52";
NFT_DESCRIPTOR_ADDRESS = "0x0B32a3F8f5b7E5d315b9E52E640a49A89d89c820";
POSITION_DESCRIPTOR_ADDRESS = "0xF357118EBd576f3C812c7875B1A1651a7f140E9C";
POSITION_MANAGER_ADDRESS = "0x519b05b3655F4b89731B677d64CEcf761f4076f6";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
const { ethers } = require("hardhat");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const MAINNET_URL = "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43";
// const provider = waffle.provider;
const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
}

const nonfungiblePositionManager = new Contract(
  POSITION_MANAGER_ADDRESS,
  artifacts.NonfungiblePositionManager.abi,
  provider
);
const factory = new Contract(FACTORY_ADDRESS, artifacts.UniswapV3Factory.abi, provider);

async function deployPool(token0, token1, fee, price) {
  const [owner] = await ethers.getSigners();
  await nonfungiblePositionManager
    .connect(owner)
    .createAndInitializePoolIfNecessary(token0, token1, fee, price, { gasLimit: 5000000 });
  const poolAddress = await factory.connect(owner).getPool(token0, token1, fee);
  return poolAddress;
}

async function main() {
  const usdtUsdc500 = await deployPool(TETHER_ADDRESS, USDC_ADDRESS, 500, encodePriceSqrt(1, 1));
  console.log("USDT_USDC_500=", `'${usdtUsdc500}'`);

  const shoRay = await deployPool(SHOAIB_ADDRESS, RAYYAN_ADDRESS, 500, encodePriceSqrt(1, 1));
  console.log("SHOAIB_RAY=", `'${shoRay}'`);
}

/*
npx hardhat run --network localhost scripts/deployPool.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

require("dotenv").config();
var fs = require("fs");

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

const RAYYAN_ADDRESS = process.env.RAYYAN_ADDRESS;
const SHOAIB_ADDRESS = process.env.SHOAIB_ADDRESS;
const TETHER_ADDRESS = process.env.TETHER_ADDRESS;
const USDC_ADDRESS = process.env.USDC_ADDRESS;

const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const POSITION_MANAGER_ADDRESS = process.env.POSITION_MANAGER_ADDRESS;

const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
const { ethers } = require("hardhat");
const { promisify } = require("util");

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

  // const shoRay = await deployPool(SHOAIB_ADDRESS, RAYYAN_ADDRESS, 500, encodePriceSqrt(1, 1));
  // console.log("SHOAIB_RAY=", `'${shoRay}'`);

  let address = [`USDT_USDC_500=${usdtUsdc500}`];
  const data = "\n" + address.join("\n");
  const writeFile = promisify(fs.appendFile);
  const filePath = ".env";
  return writeFile(filePath, data)
    .then(() => {
      console.log("Addressed recorded");
    })
    .catch((e) => {
      console.log("error logging address", e);
      throw e;
    });
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

import { BigNumber, ethers } from "ethers";
import Web3Modal from "web3modal";
import { processCus } from "../../Context/constant";

const bn = require("bignumber.js");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const UNISWAP_V3_FACTORY_ADDRESS = processCus.POOL.FACTORY_ADDRESS;
const NON_FUNGABLE_MANAGER = processCus.POOL.POSITION_MANAGER_ADDRESS;

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

export const fetchPoolContract = async (signerOrProvider) =>
  new ethers.Contract(UNISWAP_V3_FACTORY_ADDRESS, artifacts.UniswapV3Factory.abi, signerOrProvider);

export const fetchPositionContract = async (signerOrProvider) =>
  new ethers.Contract(NON_FUNGABLE_MANAGER, artifacts.NonfungiblePositionManager.abi, signerOrProvider);

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

export const connectingWithPoolContract = async (address1, address2, fee, tokenFee1, tokenFee2) => {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  console.log({ signer });

  const createPoolContract = await fetchPositionContract(signer);

  const price = encodePriceSqrt(tokenFee1, tokenFee2);

  console.log({ price, address1, address2, fee });
  const poolContract = await createPoolContract.connect(signer);

  console.log("poolContract", poolContract);
  const transaction = await poolContract.createAndInitializePoolIfNecessary(address1, address2, fee, price, {
    gasLimit: 30000000,
  });

  await transaction.wait();

  const factory = await fetchPoolContract(signer);
  const poolAddress = await factory.getPool(address1, address2, fee);

  return poolAddress;
};

import { BigNumber, ethers } from "ethers";
import Web3Modal from "web3modal";

const bn = require("bignumber.js");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const UNISWAP_V3_FACTORY_ADDRESS = "0x084815D1330eCC3eF94193a19Ec222C0C73dFf2d";
const NON_FUNGABLE_MANAGER = "0x9abb5861e3a1eDF19C51F8Ac74A81782e94F8FdC";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

export const fetchPoolContract = async (signerOrProvider) =>
  new ethers.Contract(UNISWAP_V3_FACTORY_ADDRESS, artifacts.UniswapV3Factory.abi, signerOrProvider);

export const fetchPositionContract = async (signerOrProvider) =>
  new ethers.Contract(NON_FUNGABLE_MANAGER, artifacts.UniswapV3Factory.abi, signerOrProvider);

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
  const transaction = poolContract.createAndInitializePoolIfNecessary(address1, address2, fee, price, {
    gasLimit: 30000000,
  });

  await transaction.wait();

  const factory = await fetchPoolContract(signer);
  const poolAddress = await factory.getPool(address1, address2, fee);

  return poolAddress;
};

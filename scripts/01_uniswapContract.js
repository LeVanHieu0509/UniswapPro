// const { ContractFactory, Contract, utils, BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const WETH9 = require("../Context/WETH9.json");

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  SwapRouter: require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),
  NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
  NonfungibleTokenPositionDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  WETH9,
};

const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
  Object.keys(linkReferences).forEach((fileName) => {
    Object.keys(linkReferences[fileName]).forEach((contractName) => {
      if (!libraries.hasOwnProperty(contractName)) {
        throw new Error(`Missing link library name ${contractName}`);
      }
      const address = ethers.utils.getAddress(libraries[contractName]).toLowerCase().slice(2);
      linkReferences[fileName][contractName].forEach(({ start, length }) => {
        const start2 = 2 + start * 2;
        const length2 = length * 2;
        bytecode = bytecode
          .slice(0, start2)
          .concat(address)
          .concat(bytecode.slice(start2 + length2, bytecode.length));
      });
    });
  });
  return bytecode;
};

async function main() {
  const [owner] = await ethers.getSigners();

  const Weth = new ethers.ContractFactory(artifacts.WETH9.abi, artifacts.WETH9.bytecode, owner);
  const weth = await Weth.deploy();

  const Factory = new ethers.ContractFactory(
    artifacts.UniswapV3Factory.abi,
    artifacts.UniswapV3Factory.bytecode,
    owner
  );
  const factory = await Factory.deploy();

  const SwapRouter = new ethers.ContractFactory(artifacts.SwapRouter.abi, artifacts.SwapRouter.bytecode, owner);
  const swapRouter = await SwapRouter.deploy(factory.address, weth.address);

  const NFTDescriptor = new ethers.ContractFactory(
    artifacts.NFTDescriptor.abi,
    artifacts.NFTDescriptor.bytecode,
    owner
  );

  const nftDescriptor = await NFTDescriptor.deploy();

  const linkedBytecode = linkLibraries(
    {
      bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
      linkReferences: {
        "NFTDescriptor.sol": {
          NFTDescriptor: [
            {
              length: 20,
              start: 1681, // old value is 1261
            },
          ],
        },
      },
    },
    {
      NFTDescriptor: nftDescriptor.address,
    }
  );

  const NonfungibleTokenPositionDescriptor = new ethers.ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptor.abi,
    linkedBytecode,
    owner
  );
  const nativeCurrencyLabelBytes = ethers.utils.formatBytes32String("WETH");

  const nonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    weth.address,
    nativeCurrencyLabelBytes
  );

  const NonfungiblePositionManager = new ethers.ContractFactory(
    artifacts.NonfungiblePositionManager.abi,
    artifacts.NonfungiblePositionManager.bytecode,
    owner
  );

  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    factory.address,
    weth.address,
    nonfungibleTokenPositionDescriptor.address
  );

  console.log("WETH_ADDRESS=", `'${weth.address}'`);
  console.log("FACTORY_ADDRESS=", `'${factory.address}'`);
  console.log("SWAP_ROUTER_ADDRESS=", `'${swapRouter.address}'`);
  console.log("NFT_DESCRIPTOR_ADDRESS=", `'${nftDescriptor.address}'`);
  console.log("POSITION_DESCRIPTOR_ADDRESS=", `'${nonfungibleTokenPositionDescriptor.address}'`);
  console.log("POSITION_MANAGER_ADDRESS=", `'${nonfungiblePositionManager.address}'`);
}

/*
npx hardhat run --network localhost scripts/uniswapContract.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

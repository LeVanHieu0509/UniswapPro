const hre = require("hardhat");
// import * as Config from "./config";
// import { hardhatArguments } from "hardhat";

async function main() {
  // await Config.initConfig();
  // const network = hardhatArguments.network ? hardhatArguments.network : "dev";

  //BooToken Deploy Section
  const BooToken = await hre.ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();

  await booToken.deployed();

  console.log(`booToken ${booToken.address}`);
  // Config.setConfig(network + ".booToken", booToken.address);

  //BooToken Deploy Section
  const LifeToken = await hre.ethers.getContractFactory("LifeToken");
  const lifeToken = await LifeToken.deploy();

  await lifeToken.deployed();

  console.log(`lifeToken ${lifeToken.address}`);
  // Config.setConfig(network + ".lifeToken", lifeToken.address);

  //BooToken Deploy Section
  const SwapToken = await hre.ethers.getContractFactory("SwapToken");
  const swapToken = await SwapToken.deploy();

  await swapToken.deployed();

  console.log(`swapToken ${swapToken.address}`);
  // Config.setConfig(network + ".swapToken", swapToken.address);

  //BooToken Deploy Section
  const SwapMultihop = await hre.ethers.getContractFactory("SwapMultihop");
  const swapMultihop = await SwapMultihop.deploy();

  await swapMultihop.deployed();
  console.log(`swapMultihop ${swapMultihop.address}`);
  // Config.setConfig(network + ".swapMultihop", swapMultihop.address);

  const UserStorageData = await hre.ethers.getContractFactory("UserStorageData");
  const userStorageData = await UserStorageData.deploy();

  await userStorageData.deployed();
  console.log(`userStorageData ${userStorageData.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

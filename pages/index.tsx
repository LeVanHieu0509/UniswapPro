import HomeScreen from "screens/home";
import { ethers } from "ethers";
import { useEffect } from "react";

const Home = () => {
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43"
  // );

  // const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

  // // console.log(provider);
  // const poolImmutablesAbi = [
  //   "function factory() external view returns (address)",
  //   "function token0() external view returns (address)",
  //   "function token1() external view returns (address)",
  //   "function fee() external view returns (uint24)",
  //   "function tickSpacing() external view returns (uint24)",
  //   "function maxLiquidityPerTick() external view returns (uint24)",
  // ];

  // const poolContract = new ethers.Contract(poolAddress, poolImmutablesAbi, provider);

  // console.log("poolContract", poolContract);

  // let immutables = {
  //   factory: "",
  //   token0: "",
  //   token1: "",
  //   fee: "",
  //   tickSpacing: "",
  //   maxLiquidityPerTick: "",
  // };

  // const getPoolImmutables = async () => {
  //   immutables = {
  //     factory: await poolContract.factory(),
  //     token0: await poolContract.token0(),
  //     token1: await poolContract.token1(),
  //     fee: await poolContract.fee(),
  //     tickSpacing: await poolContract.tickSpacing(),
  //     maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
  //   };

  //   const PoolImmutables = immutables;
  //   return PoolImmutables;
  // };

  // useEffect(() => {
  //   getPoolImmutables().then((result) => {
  //     console.log("result", result);
  //   });
  // }, []);

  return <HomeScreen />;
};

export default Home;

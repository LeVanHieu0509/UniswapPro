import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithDaiToken,
  connectingWithIWETHToken,
  connectingWithSingleSwapToken,
  connectingWithUserStorageContract,
  // connectingWithUserStorageContract,
} from "contracts/app";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import ERC20 from "./ERC20Token.json";
import { getPrice } from "../src/contracts/fetchingPrice";
import { swapUpdatePrice } from "../src/contracts/swapUpdatePrice";
import {
  BooTokenAddress,
  LifeTokenAddress,
  PopUpTokenAddress,
  RayyanTokenAddress,
  ShoaibTokenAddress,
} from "./constant";
import { getLiquidityData } from "contracts/checkLiquidity";
import { connectingWithPoolContract } from "contracts/deployPool";
import { addLiquidityExternal } from "contracts/addLiquidity";
// import { addLiquidityExternal } from "contracts/addLiquidity";
// import { connectingWithPoolContract } from "contracts/deployPool";
// import { getLiquidityData } from "contracts/checkLiquidity";

export const SwapTokenContext = React.createContext<{
  account: string;
  weth9: any;
  dai: any;
  networkConnect: any;
  ether: any;
  tokenData: any;
  singleSwapToken: any;
  connectWallet: any;
  getPrice: any;
  swapUpdatePrice: any;
  getAllLiquidity?: any;
  createLiquidityAndPool?: any;
}>(null);

export const SwapTokenContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");
  const [usdc, setUsdc] = useState("");

  const [tokenData, setTokenData] = useState([]);
  const [getAllLiquidity, setGetAllLiquidity] = useState([]);

  const addToken = [
    BooTokenAddress, //Boo token
    LifeTokenAddress, //Life token
    PopUpTokenAddress,
    RayyanTokenAddress,
    ShoaibTokenAddress,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //weth token
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", //dai token
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", //usdc token
  ];

  //Fetch Data
  const fetchingData = async () => {
    try {
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      //check balance
      const getBalance = await provider.getBalance(userAccount);

      const convertBal = BigNumber.from(getBalance).toString();
      const ethValue = ethers.utils.formatEther(convertBal);

      setEther(ethValue);

      //get network name
      const network = await provider.getNetwork();
      console.log(network);
      setNetworkConnect(network.name);

      //all token balance and data
      addToken.forEach(async (el, i) => {
        console.log("el", el);
        const contract = new ethers.Contract(el, ERC20, provider);
        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();

        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name,
          symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });
      });

      //GET LIQUIDITY
      const userStorageData = await connectingWithUserStorageContract();
      const userLiquidity = await userStorageData.getAllTransactions();

      console.log({ userLiquidity });

      userLiquidity.map(async (el) => {
        const liquidityData = await getLiquidityData(el.poolAddress, el.tokenAddress0, el.tokenAddress1);

        getAllLiquidity.push(liquidityData);

        console.log({ getAllLiquidity });
      });

      //WETH Balance
      const wethContract = await connectingWithIWETHToken(); //connect smart contract
      const wethBal = await wethContract.balanceOf(userAccount); //get money
      const wethToken = BigNumber.from(wethBal).toString(); //convert money

      const convertWethTokenBal = ethers.utils.formatEther(wethToken);
      setWeth9(convertWethTokenBal);

      //DAI Balance
      const daiContract = await connectingWithDaiToken(); //connect smart contract
      const daiBal = await daiContract.balanceOf(userAccount); //get money
      const daiToken = BigNumber.from(daiBal).toString(); //convert money

      const convertDaiTokenBal = ethers.utils.formatEther(daiToken);
      setDai(convertDaiTokenBal);

      //DAI Balance
      const usdcContract = await connectingWithDaiToken(); //connect smart contract
      const usdcBal = await usdcContract.balanceOf(userAccount); //get money
      const usdcToken = BigNumber.from(usdcBal).toString(); //convert money
      setUsdc(usdcToken);
    } catch (error) {
      console.log("error", error);
    }
  };
  //CREATE AND ADD LIQUIDITY
  const createLiquidityAndPool = async ({
    tokenAddress0,
    tokenAddress1,
    fee,
    tokenPrice1,
    tokenPrice2,
    slippage,
    deadline,
    tokenAmountOne,
    tokenAmountTwo,
  }) => {
    console.log({
      tokenAddress0,
      tokenAddress1,
      fee,
      tokenPrice1,
      tokenPrice2,
      slippage,
      deadline,
      tokenAmountOne,
      tokenAmountTwo,
    });
    try {
      //Create pool
      const createPool = await connectingWithPoolContract(tokenAddress0, tokenAddress1, fee, tokenPrice1, tokenPrice2);
      const poolAddress = createPool;
      //create liquidity
      const info = await addLiquidityExternal(
        tokenAddress0,
        tokenAddress1,
        poolAddress,
        tokenAmountOne,
        tokenAmountTwo
      );
      console.log({ info });
      // ADD DATA
      const userStorageData = await connectingWithUserStorageContract();
      const userLiquidity = await userStorageData.addToBlockchain(poolAddress, tokenAddress0, tokenAddress1);
      console.log({ userLiquidity });
    } catch (error) {
      console.log(error);
    }
  };

  //SINGLE
  const singleSwapToken = async ({ token1, token2, swapAmount }) => {
    console.log({
      token1: token1.tokenAddress.tokenAddress,
      token2: token2.tokenAddress.tokenAddress,
      swapAmount,
    });

    try {
      let singleSwapToken;
      let weth;
      let dai;

      singleSwapToken = await connectingWithSingleSwapToken();
      console.log("singleSwapToken", singleSwapToken);

      weth = await connectingWithIWETHToken();
      dai = await connectingWithDaiToken();

      //       const amountIn = 10n ** 18n;
      const decimals0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

      console.log({ amountIn });

      await weth.deposit({ value: amountIn });
      await weth.approve(singleSwapToken.address, amountIn);

      const transaction = await singleSwapToken.swapExactInputSingle(
        token1.tokenAddress.tokenAddress,
        token2.tokenAddress.tokenAddress,
        amountIn,
        {
          gasLimit: 35000,
        }
      );

      await transaction.wait();
      console.log({ transaction });

      const balance = await dai.balanceOf(account);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(transferAmount);

      setDai(ethValue);

      console.log("DAI balance", ethValue);
    } catch (error) {
      console.log("singleSwapToken", error);
    }
  };

  useEffect(() => {
    fetchingData();
    // singleSwapToken();
  }, []);

  return (
    <SwapTokenContext.Provider
      value={{
        createLiquidityAndPool,
        getAllLiquidity,
        connectWallet: connectWallet,
        getPrice,
        swapUpdatePrice,
        singleSwapToken,
        account,
        weth9,
        dai,
        networkConnect,
        ether,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};

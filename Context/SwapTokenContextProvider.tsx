import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithDaiToken,
  connectingWithIWETHToken,
  connectingWithSingleSwapToken,
} from "contracts/app";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import ERC20 from "./ERC20Token.json";
import { getPrice } from "../src/contracts/fetchingPrice";
import { swapUpdatePrice } from "../src/contracts/swapUpdatePrice";

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
}>(null);

export const SwapTokenContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");
  const [usdc, setUsdc] = useState("");

  const [tokenData, setTokenData] = useState([]);
  const addToken = [
    "0x9BcA065E19b6d630032b53A8757fB093CbEAfC1d", //Boo token
    "0xd8A9159c111D0597AD1b475b8d7e5A217a1d1d05", //Life token
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

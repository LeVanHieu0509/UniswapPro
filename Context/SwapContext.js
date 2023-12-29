import { checkIfWalletConnected } from "contracts/app";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers, BigNumber } from "ethers";

export const SwapTokenContext = React.createContext(null);

export const SwapTokenContextProvider = ({ children }) => {
  const swap = "welcome to swap my token";

  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dia, setDia] = useState("");

  const [tokenData, setTokenData] = useState([]);
  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x9852795dbb01913439f534b4984fBf74aC8AfA12",
    "0x889D9A5AF83525a2275e41464FAECcCb3337fF60",
  ];

  //Fetch Data
  const fetchingData = async () => {
    const userAccount = await checkIfWalletConnected();

    setAccount(userAccount);

    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //check balance
    const getBalance = await provider.getBalance(userAccount);
    const convertBal = BigNumber.from(getBalance).toString();

    console.log(convertBal);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return <SwapTokenContext.Provider value={{ swap }}>{children}</SwapTokenContext.Provider>;
};

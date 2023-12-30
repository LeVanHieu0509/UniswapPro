import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {
  BooTokenABI,
  BooTokenAddress,
  IDAIABI,
  IDAIAddress,
  IWETHABI,
  IWETHAddress,
  LifeTokenABI,
  LifeTokenAddress,
  SingleSwapTokenABI,
  SingleSwapTokenAddress,
} from "../../Context/constant";

const fetchContract = (signerOrProvider, address, ABI) => new ethers.Contract(address, ABI, signerOrProvider);

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");

    //check account has connected done?
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = account[0];
    console.log("firstAccount", firstAccount);
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");

    //check account has connected done?
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];

    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//Connecting with Boo token contract
export const connectingWithBooToken = async () => {
  try {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); //Provider is a read-only connection to the blockchain, which allows querying the blockchain state
    const signer = provider.getSigner();

    const contract = fetchContract(signer, BooTokenAddress, BooTokenABI);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const connectingWithLifeToken = async () => {
  try {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); //Provider is a read-only connection to the blockchain, which allows querying the blockchain state
    const signer = provider.getSigner();

    const contract = fetchContract(signer, LifeTokenAddress, LifeTokenABI);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const connectingWithSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); //Provider is a read-only connection to the blockchain, which allows querying the blockchain state
    const signer = provider.getSigner();

    const contract = fetchContract(signer, SingleSwapTokenAddress, SingleSwapTokenABI);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const connectingWithIWETHToken = async () => {
  try {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); //Provider is a read-only connection to the blockchain, which allows querying the blockchain state
    const signer = provider.getSigner();

    const contract = fetchContract(signer, IWETHAddress, IWETHABI);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const connectingWithDaiToken = async () => {
  try {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); //Provider is a read-only connection to the blockchain, which allows querying the blockchain state
    const signer = provider.getSigner();

    const contract = fetchContract(signer, IDAIAddress, IDAIABI);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

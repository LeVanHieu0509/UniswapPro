import axios from "axios";

const ETHERSCAN_API_KEY = "TC9CG8MI75P26QYM3VSGYZCC8EECI9PG2C";

export const getAbi = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;

  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);

  return abi;
};

export const getPoolImmutables = async (poolContract: any) => {
  const [token0, token1, fee] = await Promise.all([poolContract.token0(), poolContract.token1(), poolContract.fee()]);

  const immutables = {
    token0,
    token1,
    fee,
  };

  return immutables;
};

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43",
      },
    },
    // bsctest: {
    //   url: "https://data-seed-prebsc-2-s2.binance.org:8545",
    //   accounts: [process.env.PRIV_KEY],
    // },
  },
};

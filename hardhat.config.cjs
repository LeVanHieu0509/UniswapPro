require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43",
        // account: [`0x${"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"}`],
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/vt4GBzsMiYZSlRe7yPCTiNw6rvLKKcah",
      accounts: [`0x${"bef6384fed488d5a6035fdfd8db0d5852c081b89d6b4a0997bd171feccd4cf51"}`],
    },
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts: [process.env.PRIV_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 1000000000,
      accounts: [process.env.PRIV_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: process.env.API_KEY,
  },
};

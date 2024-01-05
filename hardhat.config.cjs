require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

module.exports = {
  solidity: {
    hardhat: {
      chainId: 31337,
      // gas: 2100000,
      // gasPrice: 8000000000,
    },
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43",
      },
    },
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts: [process.env.PRIV_KEY],
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/vt4GBzsMiYZSlRe7yPCTiNw6rvLKKcah",
      accounts: [`0x${"bef6384fed488d5a6035fdfd8db0d5852c081b89d6b4a0997bd171feccd4cf51"}`],
    },
  },
};

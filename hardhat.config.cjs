const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

// module.exports = {
//   solidity: {
//     hardhat: {
//       chainId: 31337,
//       // gas: 2100000,
//       // gasPrice: 8000000000,
//     },
//     compilers: [
//       {
//         version: "0.7.6",
//         settings: {
//           evmVersion: "istanbul",
//           optimizer: {
//             enabled: true,
//             runs: 1000,
//           },
//         },
//       },
//     ],
//   },
//   networks: {
//     hardhat: {
//       forking: {
//         url: "https://eth-mainnet.g.alchemy.com/v2/ikWCa20Rp63UZiGfHtwXzfd6UT5bFA43",
//       },
//     },
//     bsctest: {
//       url: "https://data-seed-prebsc-2-s2.binance.org:8545",
//       accounts: [process.env.PRIV_KEY],
//     },
//     polygon_mumbai: {
//       url: "https://polygon-mumbai.g.alchemy.com/v2/vt4GBzsMiYZSlRe7yPCTiNw6rvLKKcah",
//       accounts: [`0x${"bef6384fed488d5a6035fdfd8db0d5852c081b89d6b4a0997bd171feccd4cf51"}`],
//     },
//   },
// };

require("@nomiclabs/hardhat-waffle");

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
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/vt4GBzsMiYZSlRe7yPCTiNw6rvLKKcah",
      accounts: [`0x${"bef6384fed488d5a6035fdfd8db0d5852c081b89d6b4a0997bd171feccd4cf51"}`],
    },
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts: [process.env.PRIV_KEY],
    },
  },
};

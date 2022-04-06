require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      saveDeployments: false,
    },
    bscTest: {
      url: process.env.BSC_TEST,
      accounts: [process.env.PK],
    },
  },

  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSC_KEY,
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
    ],
  },
};

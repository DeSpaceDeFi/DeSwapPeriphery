require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      saveDeployments: false,
      allowUnlimitedContractSize: true,
      forking: {
        //url: process.env.BSC_URL,
        //url: process.env.POLY_URL,
        url: process.env.MAINNET_URL,
        blockNumber: 15521102,
      },
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.PK_MAIN],
    },

    bsc: {
      url: process.env.BSC,
      accounts: [process.env.PK_MAIN],
    },
    polygon: {
      url: process.env.POLY_URL,
      accounts: [process.env.PK_MAIN],
    },
  },

  etherscan: {
    //apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
      bsc: process.env.BSC_KEY,
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

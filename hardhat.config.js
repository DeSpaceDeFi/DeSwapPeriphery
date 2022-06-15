require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    //   hardhat: {
    //     saveDeployments: false,
    //   },
    //   polygonMumbai: {
    //     url: process.env.POLY_URL,
    //     accounts: [process.env.PK],
    //   },
    bscTest: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/jJ8kBo7IX5xPKKguoF4ziqJ1xhV0BlJu",
      accounts: [process.env.PK],
    },
  },

  // etherscan: {
  //   apiKey: {
  //     //polygonMumbai: process.env.POLYGONSCAN_API_KEY,
  //     //bscTestnet: process.env.BSC_KEY,
  //   },
  // },

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

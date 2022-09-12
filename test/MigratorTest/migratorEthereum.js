const { ethers } = require("hardhat");
const chai = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

describe("Migrate from Uniswap", () => {
  let migrator,
    deswapRouter,
    uniswapRouter,
    usdtToken,
    wbnb,
    usdt,
    link,
    uniLPToken1,
    uniLPToken2,
    user1,
    user2,
    admin,
    usdt_wbnb_lp,
    usdt_link_lp;
  before(async () => {
    const DeSwapMigrator = await ethers.getContractFactory("DeSwapMigrator");
    const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
    const DES = await ethers.getContractFactory("DES");
    const uniRouter = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
    const uniFactory = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
    const desRouter = "0x9D555D668A774C0919E4c53AE9ab6Eb10d1116ce";
    const desFactory = "0x28aaf78f6d62a9c9e2335287c96b615754382d96";
    usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    link = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
    wbnb = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    usdt_wbnb_lp = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852";
    usdt_link_lp = "0x9Db10C305c671153662119D453C4D2c123725566";

    [admin] = await ethers.getSigners();

    deswapRouter = await DeSwapRouter.attach(desRouter);
    uniswapRouter = await DeSwapRouter.attach(uniRouter);
    usdtToken = await DES.attach(usdt);
    uniLPToken1 = await DES.attach(usdt_wbnb_lp);
    uniLPToken2 = await DES.attach(usdt_link_lp);
    migrator = await DeSwapMigrator.deploy(
      uniFactory,
      uniRouter,
      desRouter,
      desFactory
    );

    await migrator.deployed();

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x069D2a5d415894b74C80650A5D67f09E28282B9d"],
    });
    user1 = await ethers.getSigner(
      "0x069D2a5d415894b74C80650A5D67f09E28282B9d"
    );

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x66bb0d2d70615bcc17995bc7468c6a0d983a8d67"],
    });
    user2 = await ethers.getSigner(
      "0x66bb0d2d70615bcc17995bc7468c6a0d983a8d67"
    );
  });

  it("should migrate properly", async () => {
    let uniLPBal;

    uniLPBal = await uniLPToken1.balanceOf(user1.address);
    expect(uniLPBal.toString()).to.equal("20327557887362157");

    await uniLPToken1.connect(user1).approve(migrator.address, uniLPBal);

    await migrator
      .connect(user1)
      .migrate(usdtToken.address, wbnb, ethers.utils.parseEther("0.0001"));
    console.log("going...");

    await migrator
      .connect(user1)
      .migrate(wbnb, usdtToken.address, ethers.utils.parseEther("0.0001"));
    console.log("going...");

    await migrator.connect(admin).batchWhitelist([usdt, link], true);

    await user1.sendTransaction({
      to: user2.address,
      value: ethers.utils.parseEther("0.99"),
    });

    await uniLPToken2.connect(user2).approve(migrator.address, uniLPBal);

    await migrator
      .connect(user2)
      .migrate(
        usdtToken.address,
        link,
        ethers.utils.parseEther("0.00000000059")
      );
    console.log("going...");

    await migrator
      .connect(user2)
      .migrate(
        link,
        usdtToken.address,
        ethers.utils.parseEther("0.00000000059")
      );
    console.log("gone");
  });
});

// describe("Migrate from Sushiswap", () => {
//   let migrator,
//     deswapRouter,
//     sushiswapRouter,
//     usdtToken,
//     wbnb,
//     usdt,
//     sshLPToken,
//     user1,
//     admin,
//     usdt_wbnb_lp;
//   before(async () => {
//     const DeSwapMigrator = await ethers.getContractFactory("DeSwapMigrator");
//     const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
//     const DES = await ethers.getContractFactory("DES");
//     const sshRouter = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
//     const sshFactory = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
//     const desRouter = "0x9D555D668A774C0919E4c53AE9ab6Eb10d1116ce";
//     const desFactory = "0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac";
//     usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//     wbnb = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
//     usdt_wbnb_lp = "0x06da0fd433C1A5d7a4faa01111c044910A184553";

//     [admin] = await ethers.getSigners();

//     deswapRouter = await DeSwapRouter.attach(desRouter);
//     sushiswapRouter = await DeSwapRouter.attach(sshRouter);
//     usdtToken = await DES.attach(usdt);
//     sshLPToken = await DES.attach(usdt_wbnb_lp);
//     migrator = await DeSwapMigrator.deploy(
//       sshFactory,
//       sshRouter,
//       desRouter,
//       desFactory
//     );

//     await migrator.deployed();

//     await hre.network.provider.request({
//       method: "hardhat_impersonateAccount",
//       params: ["0xa67ec8737021a7e91e883a3277384e6018bb5776"],
//     });
//     user1 = await ethers.getSigner("0xa67ec8737021a7e91e883a3277384e6018bb5776");
//   });

//   it("should migrate properly", async () => {
//     let sshLPBal;

//     sshLPBal = await sshLPToken.balanceOf(user1.address);
//     expect(sshLPBal.toString()).to.equal("2185160286435470");

//     await sshLPToken.connect(user1).approve(migrator.address, sshLPBal);

//     await migrator.connect(user1).migrate(usdtToken.address, sshLPBal);
//   });
// });

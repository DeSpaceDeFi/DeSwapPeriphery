const { ethers } = require("hardhat");
const chai = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

describe("Migrate from Quickswap", () => {
  let migrator,
    deswapRouter,
    quickRouter,
    usdtToken,
    wbnb,
    usdt,
    qckLPToken,
    user,
    admin,
    usdt_wbnb_lp;
  before(async () => {
    const DeSwapMigrator = await ethers.getContractFactory("DeSwapMigrator");
    const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
    const DES = await ethers.getContractFactory("DES");
    const qckRouter = "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff";
    const qckFactory = "0x5757371414417b8c6caad45baef941abc7d3ab32";
    const desRouter = "0x275eB6da9De810b2A3072d6Bbf4CD61f2269581E";
    const desFactory = "0xa0ead99f785f09ceb1607cef27181cedcecaa4c6";
    usdt = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
    wbnb = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    usdt_wbnb_lp = "0x604229c960e5CACF2aaEAc8Be68Ac07BA9dF81c3";

    [admin] = await ethers.getSigners();

    deswapRouter = await DeSwapRouter.attach(desRouter);
    quickRouter = await DeSwapRouter.attach(qckRouter);
    usdtToken = await DES.attach(usdt);
    qckLPToken = await DES.attach(usdt_wbnb_lp);
    migrator = await DeSwapMigrator.deploy(
      qckFactory,
      qckRouter,
      desRouter,
      desFactory
    );

    await migrator.deployed();

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0xf2eb18a344b2a9dc769b1914ad035cbb614fd238"],
    });
    user = await ethers.getSigner("0xf2eb18a344b2a9dc769b1914ad035cbb614fd238");
  });

  it("should migrate properly", async () => {
    let qckLPBal;

    qckLPBal = await qckLPToken.balanceOf(user.address);
    expect(qckLPBal.toString()).to.equal("11315979482448726");

    await qckLPToken.connect(user).approve(migrator.address, qckLPBal);

    await migrator
      .connect(user)
      .migrate(usdtToken.address, ethers.utils.parseEther("0.005"));
  });
});

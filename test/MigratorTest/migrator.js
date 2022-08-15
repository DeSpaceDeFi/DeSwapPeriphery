const { ethers } = require("hardhat");
const chai = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

describe("Migrate from Pancakeswap", () => {
  let migrator,
    deswapRouter,
    pancakeRouter,
    usdtToken,
    wbnb,
    usdt,
    panLPToken,
    user,
    admin,
    usdt_wbnb_lp;
  before(async () => {
    const DeSwapMigrator = await ethers.getContractFactory("DeSwapMigrator");
    const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
    const WBNB = await ethers.getContractFactory("WBNB");
    const DES = await ethers.getContractFactory("DES");
    const panRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const panFactory = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
    const desRouter = "0xE037d12345dA559C2Ed052Bc67545e967b8639bA";
    const desFactory = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
    usdt = "0x55d398326f99059fF775485246999027B3197955";
    wbnb = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    usdt_wbnb_lp = "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE";

    [admin] = await ethers.getSigners();

    deswapRouter = await DeSwapRouter.attach(desRouter);
    pancakeRouter = await DeSwapRouter.attach(panRouter);
    usdtToken = await DES.attach(usdt);
    panLPToken = await DES.attach(usdt_wbnb_lp);
    migrator = await DeSwapMigrator.deploy(
      panFactory,
      panRouter,
      desRouter,
      desFactory
    );

    await migrator.deployed();

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0xAd2a06D98ECcB536fdE2775c154FA88DFa2c4C0E"],
    });
    user = await ethers.getSigner("0xAd2a06D98ECcB536fdE2775c154FA88DFa2c4C0E");
  });

  it("should migrate properly", async () => {
    let panLPBal, usdtBal, desLPBal;

    panLPBal = await panLPToken.balanceOf(user.address);
    expect(panLPBal.toString()).to.equal("729626937239924927847");

    await panLPToken.connect(user).approve(migrator.address, panLPBal);

    const tx = await expect(migrator.connect(user).migrate(usdtToken.address));
  });
});

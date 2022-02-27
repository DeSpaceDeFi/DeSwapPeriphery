async function main() {
    const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
    // const WETH = await ethers.getContractFactory("WETH9");
    // const weth = await WETH.deploy()
    // await weth.deployed()
    // console.log(`WETH deployed to: ${weth.address}`)
    // const deSwapRouter = await DeSwapRouter.deploy('0x5A7D5246C94FeF60f42930eA81CFA1dEB64aa187', weth.address);
    const deSwapRouter = await DeSwapRouter.deploy('0x5A7D5246C94FeF60f42930eA81CFA1dEB64aa187', '0x3Dd9688ea769c7419A95735d24c38A45307D7F35')
    await deSwapRouter.deployed()
    console.log("DeSwapRouter deployed to:", deSwapRouter.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
  
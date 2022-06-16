async function main() {
  const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
  const WBNB = await ethers.getContractFactory("WBNB");

  const deSwapRouter = await DeSwapRouter.deploy(
    "0xA0EaD99F785F09CEb1607cEF27181CedCECaA4c6",
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" //WMATIC
  );
  await deSwapRouter.deployed();
  console.log("DeSwapRouter deployed to:", deSwapRouter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

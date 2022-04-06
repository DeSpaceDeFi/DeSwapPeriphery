async function main() {
  const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
  const WBNB = await ethers.getContractFactory("WBNB");

  const wBNB = await WBNB.deploy();
  await wBNB.deployed();
  console.log(`WBNB deployed to: ${wBNB.address}`);

  const deSwapRouter = await DeSwapRouter.deploy(
    "0x2FB7d11E299F83f482b0Ce45C56a40F97cdD2B2F",
    wBNB.address
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

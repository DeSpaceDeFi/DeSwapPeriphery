async function main() {
  const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
  const WBNB = await ethers.getContractFactory("WBNB");

  const wBNB = await WBNB.deploy();
  await wBNB.deployed();
  console.log(`WBNB deployed to: ${wBNB.address}`);

  const deSwapRouter = await DeSwapRouter.deploy(
    "0x2DA235784Cb0283219709986916DD974c454E423",
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

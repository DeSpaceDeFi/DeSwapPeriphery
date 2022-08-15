async function main() {
  const DeSwapRouter = await ethers.getContractFactory("DeSwapRouter");
  const WBNB = await ethers.getContractFactory("WBNB");

  const wbnb = await WBNB.deploy();
  await wbnb.deployed();

  const deSwapRouter = await DeSwapRouter.deploy(
    "0x28aaF78f6D62a9C9E2335287c96b615754382d96",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
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

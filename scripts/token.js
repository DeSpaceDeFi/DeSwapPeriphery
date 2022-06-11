async function main() {
  const TokenA = await ethers.getContractFactory("TokenA");
  const TokenB = await ethers.getContractFactory("TokenB");

  const tA = await TokenA.deploy();
  await tA.deployed();
  console.log(`TokenA deployed to: ${tA.address}`);

  const tB = await TokenB.deploy();
  await tB.deployed();
  console.log("TokenB deployed to:", tB.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

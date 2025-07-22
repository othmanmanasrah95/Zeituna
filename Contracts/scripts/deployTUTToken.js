// scripts/deployTUTToken.js

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the TUTToken contract
  const TUTToken = await ethers.getContractFactory("TUTToken");
  const tutToken = await TUTToken.deploy();

  await tutToken.deployed();

  console.log("TUTToken deployed to:", tutToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

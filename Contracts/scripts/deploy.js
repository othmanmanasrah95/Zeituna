const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy TUT Token
    const TUTToken = await ethers.getContractFactory("TUTToken");
    const platformWallet = "0x..."; // Replace with actual platform wallet
    const vendorWallet = "0x...";   // Replace with actual vendor wallet
    const tutToken = await TUTToken.deploy(platformWallet, vendorWallet);
    await tutToken.waitForDeployment();
    console.log("TUT Token deployed to:", await tutToken.getAddress());

    // Deploy ZYT Token
    const ZYTToken = await ethers.getContractFactory("ZYTToken");
    const zytToken = await ZYTToken.deploy();
    await zytToken.waitForDeployment();
    console.log("ZYT Token deployed to:", await zytToken.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
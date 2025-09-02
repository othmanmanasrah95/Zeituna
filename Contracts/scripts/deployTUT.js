const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying TUTToken with account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Deploy TUTToken (no constructor arguments needed)
    const TUT = await hre.ethers.getContractFactory("TUTToken");
    const tut = await TUT.deploy();
    await tut.deployed();

    console.log("TUTToken deployed to:", tut.address);
    console.log("Deployer is now the owner of TUTToken");           
    
    // Verify the deployment
    const maxSupply = await tut.MAX_SUPPLY();
    console.log("Max supply:", hre.ethers.utils.formatEther(maxSupply), "TUT");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

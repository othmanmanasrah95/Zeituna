const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const TUT = await hre.ethers.getContractFactory("TUTToken");
    const tut = await TUT.deploy(deployer.address);
    await tut.deployed();

    const ZYT = await hre.ethers.getContractFactory("ZYTTreeNFT");
    const zyt = await ZYT.deploy(deployer.address);
    await zyt.deployed();

    const tourathWallet = deployer.address;

    const Platform = await hre.ethers.getContractFactory("ZeitunaPlatform");
    const platform = await Platform.deploy(tut.address, tourathWallet);
    await platform.deployed();

    await tut.transferOwnership(platform.address);
    await zyt.transferOwnership(platform.address);

    console.log("TUTToken deployed to:", tut.address);
    console.log("ZYTTreeNFT deployed to:", zyt.address);
    console.log("ZeitunaPlatform deployed to:", platform.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

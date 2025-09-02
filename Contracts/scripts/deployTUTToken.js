// scripts/deployTUTToken.js

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("🚀 Deploying TUTToken contract...");
  console.log("Deployer address:", deployer.address);
  console.log("Deployer balance:", ethers.utils.formatEther(await deployer.getBalance()), "ETH");

  // Deploy the TUTToken contract
  const TUTToken = await ethers.getContractFactory("TUTToken");
  console.log("📦 Deploying contract...");
  
  const tutToken = await TUTToken.deploy();
  await tutToken.deployed();

  console.log("✅ TUTToken deployed successfully!");
  console.log("📍 Contract address:", tutToken.address);
  console.log("🔗 Transaction hash:", tutToken.deployTransaction.hash);
  console.log("⛽ Gas used:", tutToken.deployTransaction.gasLimit.toString());
  
  // Display contract info
  console.log("\n📋 Contract Information:");
  console.log("Name:", await tutToken.name());
  console.log("Symbol:", await tutToken.symbol());
  console.log("Max Supply:", ethers.utils.formatEther(await tutToken.MAX_SUPPLY()), "TUT");
  console.log("Min Redeem Amount:", ethers.utils.formatEther(await tutToken.MIN_REDEEM_AMOUNT()), "TUT");
  
  console.log("\n🎯 Reason Codes Available:");
  console.log("1 - REASON_INITIAL_REWARD");
  console.log("2 - REASON_TREE_ADOPTION");
  console.log("3 - REASON_PLANT_TREE");
  console.log("4 - REASON_REFERRAL");
  console.log("5 - REASON_ACHIEVEMENT");
  console.log("10 - REASON_REDEMPTION");
  
  console.log("\n💡 Next Steps:");
  console.log("1. Verify contract on Etherscan");
  console.log("2. Test reward and redeem functions");
  console.log("3. Test batch operations");
  console.log("4. Add authorized contracts as needed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

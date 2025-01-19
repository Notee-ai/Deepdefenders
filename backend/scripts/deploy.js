const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const DeepDefenders = await hre.ethers.getContractFactory("DeepDefenders");

  // Deploy the contract
  console.log("Deploying contract...");
  const deepDefenders = await DeepDefenders.deploy();

  // Wait for the contract to be deployed
  await deepDefenders.waitForDeployment();

  // Get deployment information
  const address = await deepDefenders.getAddress();
  const deployTx = deepDefenders.deploymentTransaction();

  console.log("Contract deployed!");
  console.log("Transaction Hash:", deployTx.hash);
  console.log("Contract Address:", address);
  console.log(
    "Deployment confirmed in block:",
    await deployTx.getBlockNumber()
  );
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });

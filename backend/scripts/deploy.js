const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const DeepDefenders = await hre.ethers.getContractFactory("DeepDefenders");

  // Deploy the contract
  console.log("Deploying contract...");
  const deepDefenders = await DeepDefenders.deploy();

  // Wait for the deployment transaction to be mined
  await deepDefenders.waitForDeployment();

  // Get the contract address
  const address = await deepDefenders.getAddress();

  // Get the deployment transaction
  const deployTx = deepDefenders.deploymentTransaction();

  console.log("Contract deployed successfully!");
  console.log("Contract Address:", address);
  console.log("Transaction Hash:", deployTx.hash);

  // Wait for more confirmations (optional)
  await deployTx.wait(2); // wait for 2 confirmations
  console.log("Deployment confirmed!");
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });

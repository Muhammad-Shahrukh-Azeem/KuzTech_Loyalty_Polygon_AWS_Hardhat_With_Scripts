// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
try {
  const Controller = await hre.ethers.getContractFactory("Controller");
  const controller = await Controller.deploy('0x5575bffAfeeC5F217A2F851bf3088110C60c83e2');
  await controller.deployed();

  console.log("Deployed to: ", controller.address);
  process.exit(0);
} catch (error) {
  console.log(error);
}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

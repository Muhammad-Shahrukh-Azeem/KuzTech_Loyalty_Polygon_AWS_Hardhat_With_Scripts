// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
// try {
//   const Controller = await hre.ethers.getContractFactory("Controller");
//   const controller = await Controller.deploy('0x7E59325af020181138457f61fbD4D9F54c28d709');
//   await controller.deployed();



//  DEPLOYED TO = 0xd194AEC8d05d5ab0B2301C22EE4Aa8005DF928d5;







//   console.log("Deployed to: ", controller.address);
//   process.exit(0);
// } catch (error) {
//   console.log(error);
// }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

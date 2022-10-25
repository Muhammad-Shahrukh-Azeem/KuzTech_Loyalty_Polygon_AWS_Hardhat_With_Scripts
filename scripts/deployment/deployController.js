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
//   const controller = await Controller.deploy('0x8A1aF60C254fdF2E0B8a45Df4F5104b804F6f3f7');
//   await controller.deployed();



//  DEPLOYED TO = 0xD06bdB2501FfB566Dac42e88Bcb7c3803718d7a1;







//   console.log("Deployed to: ", controller.address);
//   process.exit(0);
// } catch (error) {
//   console.log(error);
// }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
// try {
//   const PhoneBotToken = await hre.ethers.getContractFactory("PhoneBotToken");
//   const pb = await PhoneBotToken.deploy();
//   await pb.deployed();


//   // Token contract at mumbai testnet
//   // Deployed to:  0xeB098CB2222A408A4c74Cb9dda537Db71a4F2317



//   console.log("Deployed to: ", pb.address);
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

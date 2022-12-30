// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
try {
  const Controller = await hre.ethers.getContractFactory("Controller");
  const controller = await Controller.deploy('0x4e1Ea7f6e3B6A59322385eE3AFdb6358512e2370');
  await controller.deployed();



// //  DEPLOYED TO = 0x7086F9b3464BAC96a190266bd3Cc17D6e0DB18Ea;
// //  New Address = 0x09516d424eb84e1bA0CCDA42833de40436965eBd;




  console.log("Deployed to: ", controller.address);
  process.exit(0);
} catch (error) {
  console.log(error);
}

const data = {
  address: controller.address,
  abi: JSON.parse(controller.interface.format('json'))
}

// This writes the ABI and Address to the marketplace.json
fs.writeFileSync('./controller.json', JSON.stringify(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

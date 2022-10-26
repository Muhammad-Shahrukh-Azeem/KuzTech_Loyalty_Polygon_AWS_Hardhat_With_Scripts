const { providers, constants } = require("ethers");
const hre = require("hardhat");
const Token = require("../artifacts/contracts/PhoneBotToken.sol/PhoneBotToken.json");
const abi = Token.abi;
const Controller = require("../artifacts/contracts/Controller.sol/Controller.json");
const controllerAbi = Controller.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PK;
const alchemyURL = process.env.URL;
const APIKEY = process.env.APIKEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyURL);

const alchemyProvider = new hre.ethers.providers.AlchemyProvider(
  "maticmum",
  APIKEY
);

const controllerContractAddress = process.env.CONTROLLER_ADDRESS;

const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// console.log("signer done");

const controller = new web3.eth.Contract(controllerAbi, controllerContractAddress);
const PhoneBotToken = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

async function batchMinting(callerPrivateKey, walletAddresses, tokenValues) {
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const batchMinting = await controller.methods.batchMinting(walletAddresses, tokenValues)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Succesfully minted, Hash: ` + res);
    });
}


async function main() {
    await batchMinting(PRIVATE_KEY, [signer.address, signer.address], [100, 200])
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
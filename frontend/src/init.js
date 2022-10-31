const { providers } = require("ethers");
const hre = require("hardhat");
const Token = require("./PhoneBotToken.json");
const Controller = require("./controller.json");
const abi = Token.abi;
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

web3.eth.handleRevert = true;

const controllerContractAddress = process.env.CONTROLLER_ADDRESS;

const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// console.log("signer done");

const PhoneBotToken = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

const controller = new web3.eth.Contract(Controller.abi, controllerContractAddress);

module.exports = {
  abi,
  Token,
  web3,
  alchemyProvider,
  controllerContractAddress,
  signer,
  PhoneBotToken,
  PRIVATE_KEY,
  controller,
  CONTRACT_ADDRESS,
};

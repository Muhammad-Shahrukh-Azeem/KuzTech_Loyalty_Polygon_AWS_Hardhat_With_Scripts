import PB from "./PhoneBotToken.json";
import Controller from "./controller.json";
import { ethers } from "ethers";
import React, { updateState } from "react";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const URL =
  "https://polygon-mumbai.g.alchemy.com/v2/1SYlUh-bv3x8t9VfOYKZwFOHmllc5Abr";
const PK = "5d40d64c12b77c03461a09f91ef78613ca7f2b08695685428ba5fdb0b3e84207";
const APIKEY = "3U11SWNDZRE6FXR8PIATRTQ885WPJ4Y6ZX";
const CONTRACT_ADDRESS = "0xeB098CB2222A408A4c74Cb9dda537Db71a4F2317";
const CONTROLLER_ADDRESS = "0x7086F9b3464BAC96a190266bd3Cc17D6e0DB18Ea";

const provider = new ethers.getDefaultProvider(URL);
const phoneBotToken = new ethers.Contract(CONTRACT_ADDRESS, PB.abi, provider);

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(URL);

const alchemyProvider = new ethers.providers.AlchemyProvider(
  "maticmum",
  APIKEY
);

web3.eth.handleRevert = true;

const controllerContractAddress = process.env.CONTROLLER_ADDRESS;

const signer = new ethers.Wallet(PK, alchemyProvider);

// console.log("signer done");

const PhoneBotToken = new web3.eth.Contract(PB.abi, PB.address);
// console.log(PB.abi, PB.address)

const controller = new web3.eth.Contract(Controller.abi, Controller.address);

// console.log(controller.methods)
// console.log(pp)

 export const getPrice = async () => {
  try {
    // console.log(PhoneBotToken);
    const pprice = await phoneBotToken.tokenPrice();
    const price = console.log(web3.utils.hexToNumber(pprice));
    return price;
    // alert(price);
    // document.querySelectorAll("#xxx").html("value: "+price)
  } catch (e) {
    console.log(e);
  }
};

 const addTeamAddress = async (callerPrivateKey, newTeamAddress) => {
  try {
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const addTeamAddresss = await PhoneBotToken.methods
      .addTeamAddress("0x25dD6D56533F72512BAe2B7a312984241F84De95")
      .send({ from: account });
    console.log(addTeamAddresss);
    // return price;
  } catch (e) {
    console.log(e);
  }
};

























//         <button onClick={addTeamAddress}> Add Team Address </button>

// const { providers } = require("ethers");
// const hre = require("hardhat");
// const Token = require("./PhoneBotToken.json");
// const Controller = require("./controller.json");
// const abi = Token.abi;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// const PRIVATE_KEY = process.env.PK;
// const alchemyURL = process.env.URL;
// const APIKEY = process.env.APIKEY;

// import { ethers } from "ethers";

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyURL);

// const alchemyProvider = new hre.ethers.providers.AlchemyProvider(
//   "maticmum",
//   APIKEY
// );

// const provider = new ethers.getDefaultProvider(URL);
// const phoneBotToken = new ethers.Contract(CONTRACT_ADDRESS, PB.abi, provider);

// web3.eth.handleRevert = true;

// const controllerContractAddress = process.env.CONTROLLER_ADDRESS;

// const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// // console.log("signer done");

// const PhoneBotToken = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

// const controller = new web3.eth.Contract(Controller.abi, controllerContractAddress);

// export const getPrice = async () => {

//   try {
//     // console.log(PhoneBotToken);
//     const price = await PhoneBotToken.tokenPrice();
//     console.log(web3.utils.hexToNumber(price));
//     return price;

//   } catch (e) {
//     console.log(e);
//   }
// };

// module.exports = {
//   abi,
//   Token,
//   web3,
//   alchemyProvider,
//   controllerContractAddress,
//   signer,
//   PhoneBotToken,
//   PRIVATE_KEY,
//   controller,
//   CONTRACT_ADDRESS,
// };

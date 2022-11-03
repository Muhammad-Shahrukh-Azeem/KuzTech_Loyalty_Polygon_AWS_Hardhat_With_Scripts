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
    const price = web3.utils.hexToNumber(pprice);
    document.getElementById("getTokenValue").innerHTML = price;
    return price;
  } catch (e) {
    console.log(e);
  }
};

export const addTeamAddress = async (callerPrivateKey, newTeamAddress) => {
  try {
    const callerPrivateKey = document.querySelector("#first").value;
    const newTeamAddress = document.querySelector("#last").value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const addTeamAddresss = await PhoneBotToken.methods
      .addTeamAddress(newTeamAddress)
      .send({ from: account, gas: 200000 });
    console.log(addTeamAddresss);
  } catch (e) {
    console.log(e);
    document.getElementById("addTeamAddress").innerHTML = e;
  }
};

// PK = 5d40d64c12b77c03461a09f91ef78613ca7f2b08695685428ba5fdb0b3e84207

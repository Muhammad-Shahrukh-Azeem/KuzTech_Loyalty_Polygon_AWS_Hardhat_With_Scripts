import logo from "./logo.svg";
import "./App.css";
// import {
//   abi,
//   Token,
//   web3,
//   alchemyProvider,
//   controllerContractAddress,
//   signer,
//   PhoneBotToken,
// } from './init';
import PB from "./PhoneBotToken.json";
import Controller from "./controller.json";
import { ethers } from "ethers";

// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const URL =
  "https://polygon-mumbai.g.alchemy.com/v2/1SYlUh-bv3x8t9VfOYKZwFOHmllc5Abr";
const PK = "5d40d64c12b77c03461a09f91ef78613ca7f2b08695685428ba5fdb0b3e84207";
const APIKEY = "3U11SWNDZRE6FXR8PIATRTQ885WPJ4Y6ZX";
const CONTRACT_ADDRESS = "0xeB098CB2222A408A4c74Cb9dda537Db71a4F2317";
const CONTROLLER_ADDRESS = "0x7086F9b3464BAC96a190266bd3Cc17D6e0DB18Ea";

const provider = new ethers.getDefaultProvider(URL);
const PhoneBotToken = new ethers.Contract(CONTRACT_ADDRESS, PB.abi, provider);

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

// const PhoneBotToken = new web3.eth.Contract(PB.abi, PB.address);
// console.log(PB.abi, PB.address)

const controller = new web3.eth.Contract(Controller.abi, Controller.address);

// console.log(controller.methods)
// console.log(pp)

const mintToken = async () => {

  try {
    // console.log(PhoneBotToken);
    // let price = await controller.methods.getfee().call();
    // console.log(price)
    // return price;
    console.log(PhoneBotToken);
    const price = await PhoneBotToken.tokenPrice();
    console.log(price);
  

  
  } catch (e) {
    console.log(e);
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Testing Interaction
        <button onClick={mintToken}> Get Reward </button>
      </header>
    </div>
  );
}

export default App;

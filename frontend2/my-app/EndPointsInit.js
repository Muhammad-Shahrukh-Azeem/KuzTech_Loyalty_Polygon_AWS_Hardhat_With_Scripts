const PB = require('./PhoneBotToken.json')
const Controller = require('./controller.json');
const ethers = require('ethers');




let selectedAccount;
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

const controllerContractAddress = CONTROLLER_ADDRESS;

const signer = new ethers.Wallet(PK, alchemyProvider);

// console.log("signer done");

const PhoneBotToken = new web3.eth.Contract(PB.abi, PB.address);
// console.log(PB.abi, PB.address)

const controller = new web3.eth.Contract(Controller.abi, Controller.address);
const ControllerContract = new ethers.Contract(
  controllerContractAddress,
  Controller.abi,
  provider
);


const balanceOf = async (address) => {
    try{

      const balanceInHex = await ControllerContract.balanceOf(address);
      const balance = web3.utils.hexToNumber(balanceInHex);
      console.log(balance);

      return balance;
    }
    catch(e) {
      console.log(e);
 
    }
  }

const getPrice = async () => {
    try {
      const pprice = await phoneBotToken.tokenPrice();
      const price = web3.utils.hexToNumber(pprice);
      return price;
    } catch (e) {
      console.log(e);
    }
  };
  
const isBuyEnabled = async () => {

    try {
      const isenabled = await phoneBotToken.allowPurchaseToken();
      // console.log(isenabled);
      return isenabled;

    } catch (e) {
      console.log(e);

    }
  };


 const batchMinting = async (
    callerPrivateKey,
    walletAddresses,
    tokenValues
  ) => {
    try {

      web3.eth.accounts.wallet.add(callerPrivateKey);
      const account = web3.eth.accounts.wallet[0].address;
      const batchMinting = await controller.methods
        .batchMinting(walletAddresses, tokenValues)
        .send({ from: account, gas: 300000 });
      return batchMinting;
    } catch (e) {
      console.log(e);
    }
  };


  const redeem = async (callerPrivateKey, walletAddress, amount) => {
    try {
      // const callerPrivateKey = document.querySelector("#PkRedeemtokens").value;
      // const walletAddresses = document.querySelector(
      //   "#addressWalletRedeem"
      // ).value;
      // const tokenValues = document.querySelector("#AmountofRedeem").value;
      web3.eth.accounts.wallet.add(callerPrivateKey);
      const account = web3.eth.accounts.wallet[0].address;
      const balanceBeforee = await ControllerContract.balanceOf(walletAddress);
      const balanceBefore = web3.utils.hexToNumberString(balanceBeforee._hex);
      console.log("Balance before redeem: ", balanceBefore);
      const burn = await PhoneBotToken.methods
        .burn(amount)
        .send({ from: account, gas: 300000 });
      console.log(burn);
  
      const balanceAfterr = await ControllerContract.balanceOf(walletAddress);
      const balanceAfter = web3.utils.hexToNumberString(balanceAfterr._hex);
      console.log("Balance After redeem: ", balanceAfter);
      return burn;
      // document.getElementById("redeemAmount").innerHTML =
      //   "Burned sucessfully, tx: " +
      //   burn.transactionHash +
      //   " ||  Balance changed from " +
      //   balanceBefore +
      //   " to " +
      //   balanceAfter;
    } catch (e) {
      console.log(e);
      // document.getElementById("redeemAmountFunc").innerHTML =
      //   "Error: " + e.transactionHash + " (if undefined check console)";
    }
  };
  






  
//   balanceOf('0x6e2638c8166Fa3F678c1561408A7066aa5d9331E')
  module.exports = {
    balanceOf,
    getPrice,
    isBuyEnabled,
    batchMinting,
    redeem
  };
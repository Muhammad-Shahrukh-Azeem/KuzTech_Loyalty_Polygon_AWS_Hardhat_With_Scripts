const { ethers } = require("ethers");
const { maticBalance } = require("../../frontend2/my-app/EndPointsInit");

function newWallet() {
  const wallet = ethers.Wallet.createRandom();

  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address,
    mnemonic: wallet._mnemonic().phrase,
  };

  // console.log(response);
  // res.json({ data: response });
  return response;
}

function creatingWallets() {
  let arr = new Array;
  for (let i = 0; i < 10; i++) {
    arr[i] = newWallet();
  }
  console.log(arr)
  return arr;
}

module.exports = { creatingWallets };

creatingWallets();

const { ethers } = require("ethers");

function newWallet() {
  const wallet = ethers.Wallet.createRandom();

  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address,
    mnemonic: wallet._mnemonic().phrase,
  };

  console.log(response);
  // res.json({ data: response });
  return response;
}

newWallet()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

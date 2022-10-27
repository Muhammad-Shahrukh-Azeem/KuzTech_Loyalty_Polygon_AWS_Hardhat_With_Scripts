const {
  abi,
  Token,
  web3,
  alchemyProvider,
  controllerContractAddress,
  signer,
  PhoneBotToken,
  PRIVATE_KEY,
  controller
} = require("../init");

async function batchMinting(callerPrivateKey, walletAddresses, tokenValues) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const batchMinting = await controller.methods
    .batchMinting(walletAddresses, tokenValues)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Succesfully minted, Hash: ` + res);
    });
}

async function main() {
  await batchMinting(PRIVATE_KEY, [signer.address, signer.address], [100, 200]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

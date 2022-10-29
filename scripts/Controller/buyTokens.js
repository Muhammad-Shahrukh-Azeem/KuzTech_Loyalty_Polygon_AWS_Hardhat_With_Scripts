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

  async function getTokenPrice() {
    const price = await PhoneBotToken.methods
      .tokenPrice()
      .call();
      console.log("Current price is: ",price);
      return price;
  }

  async function isBuyEnabled() {
    const enable = await PhoneBotToken.methods
      .allowPurchaseToken()
      .call();
      console.log("Buy Feature is currenty enabled? : ",enable);
      return enable;
  }

  
  async function buyToken(callerPrivateKey, reciever, quantity) {
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const price = ((await getTokenPrice()) * quantity);
    const buyToken = await controller.methods
      .buyTokens(reciever, quantity)
      .send({ from: account, gas: 300000, value: price }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log(`Succesfully minted, Hash: ` + res);
      });
  }


  
  async function main() {
    await getTokenPrice();
    // await enablePurchases(PRIVATE_KEY);
    // await buyToken(PRIVATE_KEY, signer.address, 110000000000000);
    await isBuyEnabled();
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
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

  // THE FUNCTION APPROVES SOMEONE TO USE THEIR TOKENS (CAN ONLY BE CALLED BY THE USER THEMSELVES)
async function approve(callerPrivateKey, spenderAddress, amount) {
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const mint = await PhoneBotToken.methods
      .mint(spenderAddress, amount)
      .send({ from: account, gas: 300000 }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Sucessfully Approved, Hash: " + res);
      });
  }
  
  async function burn(callerPrivateKey, amount) {
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const burn = await PhoneBotToken.methods
      .burn(amount)
      .send({ from: account, gas: 300000 }, function (err, res) {
        if (err) {
          console.log("An error occured", err.reason);
          console.log("An error occured", err);

          return;
        }
        console.log(`Succesfully burned ${amount}, Hash: ` + res);
      });
  }

  async function balanceOf(address) {
    const balance = await PhoneBotToken.methods
      .balanceOf(address)
      .call({}, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log(`Balance of ran sucessfull, Balance: ` + res);
        return res;
      });
  }

  async function redeem(callerPrivateKey, address, amount){
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const balanceBefore = await PhoneBotToken.methods.balanceOf(address).call();
    const burn = await PhoneBotToken.methods
      .burn(amount)
      .send({ from: account, gas: 300000 }, function (err, res) {
        if (err) {
          console.log("An error occured", err.reason);
          console.log("An error occured", err);
          return;
        }
        console.log(`Succesfully burned ${amount}, Hash: ` + res);
      });
    const balanceAfter = await PhoneBotToken.methods.balanceOf(address).call();
  }
  
  
  async function main() {
    // await balanceOf(signer.address);
    // await burn(PRIVATE_KEY, 100);
    // await balanceOf(signer.address);
    await redeem(PRIVATE_KEY, signer.address, 100);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
  
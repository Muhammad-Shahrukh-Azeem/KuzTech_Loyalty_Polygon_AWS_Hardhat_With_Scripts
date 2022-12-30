const {
  abi,
  Token,
  web3,
  alchemyProvider,
  controllerContractAddress,
  signer,
  PhoneBotToken,
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
} = require("../init");

// THIS FUNCTION RETURNS THE BUYING PRICE OF TOKEN IN WEI
// async function getTokenValue() {
//   const tokenValue = await PhoneBotToken.methods.tokenPrice().call();
//   return tokenValue;
// }

// THE FUNCTION ADDS AN ADDRESS OF THE TEAM WHO CAN CALL THE CONTROLLER CONTRACT (CAN ONLY BE CALLED BY OWNER)
async function addTeamAddress(callerPrivateKey, newTeamAddress) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const addTeamAddress = await PhoneBotToken.methods
    .addTeamAddress(newTeamAddress)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Team member ${newTeamAddress} added, Hash: ` + res);
    });
}

// THE FUNCTION RETURNS TRUE IF THE ADDRESS ADDED IS ALLOWED TO ACCESS CONTROLLER FUNCTIONS
async function checkTeamAddress(teamAddress) {
  return await PhoneBotToken.methods.teamAccessRecord(teamAddress).call();
}

// THE FUNCTION ADDS THE CONTRACT ADDRESS WHO WILL BE ALLOWED TO INTERACT WITH THE MAIN CONTRACT (CAN ONLY BE CALLED BY THE OWNER)
async function addContractAddress(callerPrivateKey, newContractAddress) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const addContractAddress = await PhoneBotToken.methods
    .addContractAddress(newContractAddress)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Contract ${newContractAddress} added, Hash: ` + res);
    });

  web3.eth.accounts.wallet.remove(account);
  // console.log(web3.eth.accounts.wallet);
}

// THE FUNCTION REMOVES THE CONTRACT ADDRESS WHO WILL BE ALLOWED TO INTERACT WITH THE MAIN CONTRACT (CAN ONLY BE CALLED BY THE OWNER)
async function removeContractAddress(callerPrivateKey, ContractAddress) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const removeContractAddresss = await PhoneBotToken.methods
    .removeContractAddress(ContractAddress)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Contract ${ContractAddress} Removed, Hash: ` + res);
    });

  web3.eth.accounts.wallet.remove(account);
  // console.log(web3.eth.accounts.wallet);
}

// THE FUNCTION RETURNS TRUE IF THEIR ADDRESS IS ALLOWED OR SAVED
async function getContractAddresses(contracrAddress) {
  return await PhoneBotToken.methods.contractAccess(contracrAddress).call();
}

// THE FUNCTION MINTS SOME TOKEN TO OME ADDRESS(CAN ONLY BE CALLED BY THE TEAM-MEMBERS)
async function mint(callerPrivateKey, recieverAddress, amount) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const mint = await PhoneBotToken.methods
    .mint(recieverAddress, amount)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Sucessfully minted ${amount}, Hash: ` + res);
    });
}

// THE FUNCTION UPDATES PRICE OF TOKENS(CAN ONLY BE CALLED BY THE Owner)
async function setTokenPrice(callerPrivateKey, newPrice) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const setTokenPrice = await PhoneBotToken.methods
    .setTokenPrice(newPrice)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`New Price is set to ${newPrice}, Hash: ` + res);
    });
}

// THE FUNCTION RETURNS TRUE IF THEIR ADDRESS IS ALLOWED OR SAVED
async function getContractAddresses(contracrAddress) {
  return await PhoneBotToken.methods.contractAccess(contracrAddress).call();
}

async function isBuyEnabled() {
  const enable = await PhoneBotToken.methods
    .allowPurchaseToken()
    .call();
    console.log("Buy Feature is currenty enabled? : ",enable);
    return enable;
}

async function enablePurchases(callerPrivateKey) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const enable = await PhoneBotToken.methods
    .enablePurchaseToken()
    .send({ from: account, gas: 300000,}, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Succesfully enabled, Hash: ` + res);
    });
}


async function disablePurchases(callerPrivateKey) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const disable = await PhoneBotToken.methods
    .disablePurchaseToken()
    .send({ from: account, gas: 300000,}, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log(`Succesfully disabled, Hash: ` + res);
    });
}

async function main() {
  console.log(await getTokenValue());
  console.log(await checkTeamAddress(signer.address));
  // console.log(await addTeamAddress(PRIVATE_KEY, signer.address));;

  // console.log(await getContractAddresses(CONTRACT_ADDRESS));

  // console.log(await removeContractAddress(PRIVATE_KEY, controllerContractAddress));
  // console.log(await addContractAddress(PRIVATE_KEY, CONTRACT_ADDRESS));
  // console.log(await addContractAddress(PRIVATE_KEY, controllerContractAddress));
  console.log(await getContractAddresses(controllerContractAddress));
  console.log(await getContractAddresses(CONTRACT_ADDRESS));

  // await isBuyEnabled();
  // await enablePurchases(PRIVATE_KEY);
  // await isBuyEnabled();

  // await disablePurchases(PRIVATE_KEY);
  // await isBuyEnabled();

  // console.log(await setTokenPrice(PRIVATE_KEY, 2000));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

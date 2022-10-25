const { providers } = require("ethers");
const hre = require("hardhat");
const Token = require("../artifacts/contracts/PhoneBotToken.sol/PhoneBotToken.json");
const abi = Token.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PK;
const alchemyURL = process.env.URL;
const APIKEY = process.env.APIKEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyURL);

const alchemyProvider = new hre.ethers.providers.AlchemyProvider(
  "maticmum",
  APIKEY
);

const controllerContractAddress = "0x8424b1E588e771Af5940EDAa35ADE2075A37E0Ba";

const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);

console.log("signer done");

const PhoneBotToken = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

// THIS FUNCTION RETURNS THE BUYING PRICE OF TOKEN IN WEI
async function getTokenValue() {
  const tokenValue = await PhoneBotToken.methods.tokenPrice().call();
  return tokenValue;
}

// THIS FUNCTION RETURNS THE ADDRESS OF THE OWNER
async function getOwner() {
  const owner = await PhoneBotToken.methods.owner().call();
  return owner;
}

// THE FUNCTION ADDS AN ADDRESS OF THE TEAM WHO CAN CALL THE CONTROLLER CONTRACT (CAN ONLY BE CALLED BY OWNER)
async function addTeamAddress(callerPrivateKey, newTeamAddress) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  console.log(web3.eth.accounts.wallet);

  const addTeamAddress = await PhoneBotToken.methods
    .addTeamAddress(newTeamAddress)
    .send({ from: account, gas: 300000 }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Team member added, Hash: " + res);
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
      console.log("Wallet added, Hash: " + res);
    });

  web3.eth.accounts.wallet.remove(account);
  // console.log(web3.eth.accounts.wallet);
}

// THE FUNCTION RETURNS TRUE IF THEIR ADDRESS IS ALLOWED OR SAVED
async function getContractAddresses(contracrAddress) {
  return await PhoneBotToken.methods.contractAccess(contracrAddress).call();
}

// THE FUNCTION RETURNS TRUE IF THEIR ADDRESS IS ALLOWED OR SAVED
async function getUserBalance(userAddress) {
  return await PhoneBotToken.methods.balanceOf(userAddress).call();
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
      console.log("Sucessfully minted, Hash: " + res);
    });
}

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

async function main() {
  console.log(await getTokenValue());
  console.log(await getOwner());
  console.log(await checkTeamAddress(signer.address));
  // console.log(await addContractAddress(PRIVATE_KEY, controllerContractAddress)); // Already called will throw error if called again
  console.log(await getContractAddresses(controllerContractAddress));
  // console.log(await mint(PRIVATE_KEY, signer.address, 5000000));
  console.log(await getUserBalance(signer.address));
  // console.log(await approve(PRIVATE_KEY, signer.address, 1000)); // Already called
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    p;
    rocess.exit(1);
  });

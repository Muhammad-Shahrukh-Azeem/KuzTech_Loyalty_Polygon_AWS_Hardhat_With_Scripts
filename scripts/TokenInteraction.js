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

const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);

console.log("signer done");

const PhoneBotToken = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

async function getTokenValue() {
  const tokenValue = await PhoneBotToken.methods.tokenPrice().call();
  //   console.log(tokenValue);
  return tokenValue;
}

async function getOwner() {
  const owner = await PhoneBotToken.methods.owner().call();
  //   console.log(owner);
  return owner;
}

// async function testAddTeam() {

//   const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

//   web3.eth.sendSignedTransaction(signedTx.rawTransaction, fun)

// }

async function addTeamAddress() {
  web3.eth.accounts.wallet.add(PRIVATE_KEY);
  const account = web3.eth.accounts.wallet[0].address;
  // console.log(web3.eth.accounts.wallet);

  // const addTeamAddress = await PhoneBotToken.methods
  //   .addTeamAddress("0x8BDB54Ac76ca5d98E8328E0AC13e07a693a97e30")
  //   .send({ from: account,
  //           gas: 300000, }, function (err, res) {
  //     if (err) {
  //       console.log("An error occured", err);
  //       return;
  //     }
  //     console.log("Hash of the transaction: " + res);
  //   });

  await PhoneBotToken.methods
    .teamAccessRecord("0x8BDB54Ac76ca5d98E8328E0AC13e07a693a97e30")
    .call({}, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Hash of the transaction: " + res);
    });

  web3.eth.accounts.wallet.remove(account);
  // console.log(web3.eth.accounts.wallet);
}

// This function will run when we need to run or change the address of the tax collector
async function addContractAddress() {
  web3.eth.accounts.wallet.add(PRIVATE_KEY);
  const account = web3.eth.accounts.wallet[0].address;
  const addContractAddress = await PhoneBotToken.methods.addContractAddress('0x8424b1E588e771Af5940EDAa35ADE2075A37E0Ba')
    .send({ from: account,
            gas: 300000, }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Hash of the transaction: " + res);
    });

  web3.eth.accounts.wallet.remove(account);
  // console.log(web3.eth.accounts.wallet);
}

async function getContractAddresses() {
  web3.eth.accounts.wallet.add(PRIVATE_KEY);
  const account = web3.eth.accounts.wallet[0].address;
  const getContractAddresses = await PhoneBotToken.methods
    .contractAccess('0x8424b1E588e771Af5940EDAa35ADE2075A37E0Ba')
    .call({ from: account, gas: 300000, }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Hash of the transaction: " + res);
    });
}

async function mint() {
  web3.eth.accounts.wallet.add(PRIVATE_KEY);
  const account = web3.eth.accounts.wallet[0].address;
  const mint = await PhoneBotToken.methods
    .mint('0x8424b1E588e771Af5940EDAa35ADE2075A37E0Ba', 500)
    .send({ from: account, gas: 300000, }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Hash of the transaction: " + res);
    });
}

async function main() {
  console.log(await getTokenValue());
  console.log(await getOwner());
  console.log(await addTeamAddress());
  // console.log(await addContractAddress()); // Already Addeed: tx hash = 0xed17cd99be665261d67556b173a40c2a78241ee61dd6439f54330b30c4d53a02
  console.log(await getContractAddresses());
  // console.log(await mint()); // Already Called for mint : tx hash = 0x97cc0652b63614abf041390126ffad3c0b5edf369716898b7e1108f20a3f0610
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    p;
    rocess.exit(1);
  });

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

async function main() {
  console.log(await getTokenValue());
  console.log(await getOwner());
  console.log(await addTeamAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    p;
    rocess.exit(1);
  });

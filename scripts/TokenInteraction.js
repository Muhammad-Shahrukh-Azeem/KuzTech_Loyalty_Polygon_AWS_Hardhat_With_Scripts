const Token = require("../artifacts/contracts/PhoneBotToken.sol/PhoneBotToken.json");
const abi = Token.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PK;
const alchemyURL = process.env.URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyURL);

const PhoneBottoken = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

async function getTokenValue() {
  const tokenValue = await PhoneBottoken.methods.tokenPrice().call();
//   console.log(tokenValue);
  return tokenValue;
}

async function getOwner() {
  const owner = await PhoneBottoken.methods.owner().call();
//   console.log(owner);
  return owner;
}

async function main() {
  console.log(await getTokenValue());
  console.log(await getOwner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

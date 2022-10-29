const { float } = require("hardhat/internal/core/params/argumentTypes");
const {
  abi,
  Token,
  web3,
  alchemyProvider,
  controllerContractAddress,
  signer,
  PhoneBotToken,
  PRIVATE_KEY,
  controller,
} = require("../init");

async function maticBalance(address) {
  const balanceInWei = await web3.eth.getBalance(address);
  const balanceInMatic = web3.utils.fromWei(
    web3.utils.toBN(balanceInWei),
    "ether"
  );
  console.log(balanceInMatic);
}

async function fundWalletForRedemption(callerPrivateKey, reciever) {
  web3.eth.accounts.wallet.add(callerPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  await web3.eth
    .sendTransaction({
      from: account,
      to: reciever,
      //   value: web3.utils.toWei("0.15", "ether"),
      value: "50000000000000000",
      gas: 100000,
    })
    .then(function (receipt) {
      console.log(receipt.transactionHash);
    });
  web3.eth.accounts.wallet.clear();
}

async function fundAllWallets(callerPrivateKey, recievers) {
  for (let index = 0; index < recievers.length; index++) {
    await fundWalletForRedemption(callerPrivateKey, recievers[index]);
  }
}


async function main() {
  // await balanceOf(signer.address);
  // await burn(PRIVATE_KEY, 100);
  // await balanceOf(signer.address);
  // await redeem(PRIVATE_KEY, signer.address, 100);
//   await maticBalance(signer.address);
  //   await fundWalletForRedemption(
  //     PRIVATE_KEY,
  //     "0x25dD6D56533F72512BAe2B7a312984241F84De95"
  //   );
//   await maticBalance(signer.address);
//   await fundAllWallets(PRIVATE_KEY, [
//     "0x25dD6D56533F72512BAe2B7a312984241F84De95",
//     "0x25dD6D56533F72512BAe2B7a312984241F84De95",
//   ]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

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
  //   console.log(balanceInMatic);
  return balanceInWei;
}

async function drainWallet(targetPrivateKey, reciever) {
  web3.eth.accounts.wallet.add(targetPrivateKey);
  const account = web3.eth.accounts.wallet[0].address;
  const totalBalance = (await maticBalance(account)) - 500000000000000;
  await web3.eth
    .sendTransaction({
      from: account,
      to: reciever,
      //   value: web3.utils.toWei("0.15", "ether"),
      value: totalBalance,
      gas: 100000,
    })
    .then(function (receipt) {
      console.log(receipt.transactionHash);
    });
  web3.eth.accounts.wallet.clear();
}

// MAKE EMERGENCY RETRIVAL FOR ALL IN THE FUNCTION BELOW

async function drainAllWallets(targetPrivateKeys, reciever) {
  for (let index = 0; index < targetPrivateKeys.length; index++) {
    await drainWallet(targetPrivateKeys[index], reciever);
  }
}

async function main() {

  console.log(await maticBalance("0x380FcE75a28166050d00C4E41d446b45bF13Da82"));
  //   await fundWalletForRedemption(
  //     PRIVATE_KEY,
  //     "0x25dD6D56533F72512BAe2B7a312984241F84De95"
  //   );
  //   await drainWallet(
  //     "442e5d49aaca6b5e51519b711f3c03c3763d7932542969f3a7e3fe9d530e8e2c",
  //     "0x25dD6D56533F72512BAe2B7a312984241F84De95"
  //   );



//   console.log("Balance Before: ", await maticBalance('0x6e2638c8166Fa3F678c1561408A7066aa5d9331E'));
//   console.log("Balance Before: ", await maticBalance('0x380FcE75a28166050d00C4E41d446b45bF13Da82'));
//   console.log("Balance Before: ", await maticBalance('0xA59e2a6692bDB2B20aDCCa2D3Fe083d5035b0d70'));

// //   await drainAllWallets(
// //     [
// //       "46daaa2c2ef60ed33b52b9b7edaa5e2ef1d9cd4177044437064d9352530b8166",
// //       "442e5d49aaca6b5e51519b711f3c03c3763d7932542969f3a7e3fe9d530e8e2c",
// //       "d5633c3d6ba1a510250d81ce053d1ae708e7bdfafaba96566dde01a22774bb84",
// //     ],
// //     "0x25dD6D56533F72512BAe2B7a312984241F84De95"
// //   );

//   console.log("Balance After: ", await maticBalance('0x6e2638c8166Fa3F678c1561408A7066aa5d9331E'));
//   console.log("Balance After: ", await maticBalance('0x380FcE75a28166050d00C4E41d446b45bF13Da82'));
//   console.log("Balance After: ", await maticBalance('0xA59e2a6692bDB2B20aDCCa2D3Fe083d5035b0d70'));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

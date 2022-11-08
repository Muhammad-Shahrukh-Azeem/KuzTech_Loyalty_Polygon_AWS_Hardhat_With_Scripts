import PB from "./PhoneBotToken.json";
import Controller from "./controller.json";
import { ethers } from "ethers";
import React, { updateState } from "react";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const URL =
  "https://polygon-mumbai.g.alchemy.com/v2/1SYlUh-bv3x8t9VfOYKZwFOHmllc5Abr";
const PK = "5d40d64c12b77c03461a09f91ef78613ca7f2b08695685428ba5fdb0b3e84207";
const APIKEY = "3U11SWNDZRE6FXR8PIATRTQ885WPJ4Y6ZX";
const CONTRACT_ADDRESS = "0xeB098CB2222A408A4c74Cb9dda537Db71a4F2317";
const CONTROLLER_ADDRESS = "0x7086F9b3464BAC96a190266bd3Cc17D6e0DB18Ea";

const provider = new ethers.getDefaultProvider(URL);
const phoneBotToken = new ethers.Contract(CONTRACT_ADDRESS, PB.abi, provider);

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(URL);

const alchemyProvider = new ethers.providers.AlchemyProvider(
  "maticmum",
  APIKEY
);

web3.eth.handleRevert = true;

const controllerContractAddress = CONTROLLER_ADDRESS;

const signer = new ethers.Wallet(PK, alchemyProvider);

// console.log("signer done");

const PhoneBotToken = new web3.eth.Contract(PB.abi, PB.address);
// console.log(PB.abi, PB.address)

const controller = new web3.eth.Contract(Controller.abi, Controller.address);
const ControllerContract = new ethers.Contract(
  controllerContractAddress,
  Controller.abi,
  provider
);

// console.log(controller.methods)
// console.log(pp)

export const getPrice = async () => {
  try {
    // console.log(PhoneBotToken);
    const pprice = await phoneBotToken.tokenPrice();
    const price = web3.utils.hexToNumber(pprice);
    document.getElementById("getTokenValue").innerHTML = price;
    return price;
  } catch (e) {
    console.log(e);
  }
};

export const addTeamAddress = async (callerPrivateKey, newTeamAddress) => {
  try {
    const callerPrivateKey = document.querySelector("#first").value;
    const newTeamAddress = document.querySelector("#last").value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const addTeamAddresss = await PhoneBotToken.methods
      .addTeamAddress(newTeamAddress)
      .send({ from: account, gas: 200000 });
    console.log(addTeamAddresss);
  } catch (e) {
    console.log(e);
    document.getElementById("addTeamAddress").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const addContractAddress = async (
  callerPrivateKey,
  newContractAddress
) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkContractAddContractAddress"
    ).value;
    const newContractAddress = document.querySelector(
      "#AddContractAddress"
    ).value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const addContractAddresss = await PhoneBotToken.methods
      .addContractAddress(newContractAddress)
      .send({ from: account, gas: 200000 });
    console.log(addContractAddresss);
    document.getElementById("addContractAddressFunc").innerHTML =
      "Contract Added Sucessfully, tx: " + newContractAddress;
  } catch (e) {
    console.log(e);
    document.getElementById("addContractAddress").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const removeContractAddress = async (
  callerPrivateKey,
  ContractAddress
) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkContractRemoveContractAddress"
    ).value;
    const ContractAddress = document.querySelector(
      "#ContractAddressRemoveContractAddress"
    ).value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const removeContractAddresss = await PhoneBotToken.methods
      .removeContractAddress(ContractAddress)
      .send({ from: account, gas: 200000 });
    console.log(removeContractAddresss);
    document.getElementById("removeContractAddressFunc").innerHTML =
      "Contract removed Sucessfully, tx: " + ContractAddress;
  } catch (e) {
    console.log(e);
    document.getElementById("removeContractAddress").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const setTokenPrice = async (callerPrivateKey, newPrice) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkContractSetTokenPrice"
    ).value;
    const newPrice = document.querySelector("#setNewTokenPrice").value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const setTokenPrice = await PhoneBotToken.methods
      .setTokenPrice(newPrice)
      .send({ from: account, gas: 300000 });
    console.log(setTokenPrice);
    document.getElementById("showSetNewTokenPrice").innerHTML =
      "New Price set sucessfully: " + newPrice;
  } catch (e) {
    console.log(e);
    document.getElementById("setNewTokenPriceFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const isBuyEnabled = async () => {
  try {
    const isenabled = await phoneBotToken.allowPurchaseToken();
    console.log(isenabled);
    document.getElementById("isBuyEnabled").innerHTML =
      "Enabled is: " + isenabled;
  } catch (e) {
    console.log(e);
    document.getElementById("isBuyEnabledFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const enablePurchases = async (callerPrivateKey) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkContractEnablePurchases"
    ).value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const enablePurchases = await PhoneBotToken.methods
      .enablePurchaseToken()
      .send({ from: account, gas: 300000 });
    console.log(enablePurchases);
    document.getElementById("enablePurchases").innerHTML =
      "Purchases enabled sucessfully, tx: " + enablePurchases.transactionHash;
  } catch (e) {
    console.log(e);
    document.getElementById("enablePurchasesFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const disablePurchases = async (callerPrivateKey) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkContractDisablePurchases"
    ).value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const disablePurchases = await PhoneBotToken.methods
      .disablePurchaseToken()
      .send({ from: account, gas: 300000 });
    console.log(disablePurchases);
    document.getElementById("disablePurchases").innerHTML =
      "Purchases disabled sucessfully, tx: " + disablePurchases.transactionHash;
  } catch (e) {
    console.log(e);
    document.getElementById("disablePurchasesFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

async function maticBalance(address) {
  const balanceInWei = await web3.eth.getBalance(address);
  const balanceInMatic = web3.utils.fromWei(
    web3.utils.toBN(balanceInWei),
    "ether"
  );
  //   console.log(balanceInMatic);
  return balanceInWei;
}

export const batchMinting = async (
  callerPrivateKey,
  walletAddresses,
  tokenValues
) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkTeambatchMinting"
    ).value;
    const walletAddresses = document.querySelector(
      "#AddressWalletsBatchMinting"
    ).value;

    const tokenValues = document.querySelector(
      "#TokenValuesBatchMinting"
    ).value;
    // const myArray = [walletAddresses];
    const myArray = walletAddresses.split(" ");
    const myArray2 = tokenValues.split(" ");
    console.log(myArray);
    console.log(myArray2);
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const batchMinting = await controller.methods
      .batchMinting(myArray, myArray2)
      .send({ from: account, gas: 300000 });
    console.log(batchMinting);
    document.getElementById("batchMinting").innerHTML =
      "Batch minted sucessfully, tx: " + batchMinting.transactionHash;
  } catch (e) {
    console.log(e);
    document.getElementById("batchMintingFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const fundWalletForRedemption = async (
  callerPrivateKey,
  address,
  amount
) => {
  try {
    const callerPrivateKey = document.querySelector(
      "#PkfundWalletForRedemption"
    ).value;
    const ArrayAddresses = document.querySelector("#addressWalletFunds").value;
    const tokenValueinMatic = document.querySelector("#AmountToFund").value;
    const tokenValue = web3.utils.toWei(tokenValueinMatic, "ether");
    console.log(tokenValue);
    const walletAddresses = ArrayAddresses.split(" ");
    // console.log(walletAddresses);

    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    let fundWallet;
    for (let i = 0; i < walletAddresses.length; i++) {
      fundWallet = await web3.eth
        .sendTransaction({
          from: account,
          to: walletAddresses[i],
          //   value: web3.utils.toWei("0.15", "ether"),
          value: tokenValue,
          gas: 100000,
        })
        .then(function (receipt) {
          console.log(receipt.transactionHash);
          document.getElementById("fundWalletForRedemption").innerHTML =
            "Sucessfully Funded " +
            walletAddresses[i] +
            " , tx: " +
            receipt.transactionHash;
        });
    }
    web3.eth.accounts.wallet.clear();
  } catch (e) {
    console.log(e);
    document.getElementById("fundWalletForRedemptionFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const redeem = async (callerPrivateKey, address, amount) => {
  try {
    const callerPrivateKey = document.querySelector("#PkRedeemtokens").value;
    const walletAddresses = document.querySelector(
      "#addressWalletRedeem"
    ).value;
    const tokenValues = document.querySelector("#AmountofRedeem").value;
    web3.eth.accounts.wallet.add(callerPrivateKey);
    const account = web3.eth.accounts.wallet[0].address;
    const balanceBeforee = await ControllerContract.balanceOf(walletAddresses);
    const balanceBefore = web3.utils.hexToNumberString(balanceBeforee._hex);
    console.log("Balance before redeem: ", balanceBefore);
    const burn = await PhoneBotToken.methods
      .burn(tokenValues)
      .send({ from: account, gas: 300000 });
    console.log(burn);

    const balanceAfterr = await ControllerContract.balanceOf(walletAddresses);
    const balanceAfter = web3.utils.hexToNumberString(balanceAfterr._hex);
    console.log("Balance After redeem: ", balanceAfter);

    document.getElementById("redeemAmount").innerHTML =
      "Burned sucessfully, tx: " +
      burn.transactionHash +
      " ||  Balance changed from " +
      balanceBefore +
      " to " +
      balanceAfter;
  } catch (e) {
    console.log(e);
    document.getElementById("redeemAmountFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};

export const drainWallet = async (
  callerPrivateKeys,
  address,
  amount
) => {
  try {
    const callerPrivateKeys = document.querySelector(
      "#PkofTargetAddresses"
    ).value;
    const reciever = document.querySelector("#recieverAddress").value;
    const privateKeys = callerPrivateKeys.split(" ");
    console.log(privateKeys);

    for(let i = 0; i < privateKeys.length; i++){
      web3.eth.accounts.wallet.add(privateKeys[i]);
      const account = web3.eth.accounts.wallet[0].address;
      const totalBalance = (await maticBalance(account)) - 500000000000000;
      await web3.eth
      .sendTransaction({
        from: account,
        to: reciever,
        value: totalBalance,
        gas: 100000,
      })
      .then(function (receipt) {
        console.log(receipt.transactionHash);
        document.getElementById("WalletDrained").innerHTML =
            "Sucessfully Drained " +
            account.address +
            " , tx: " +
            receipt.transactionHash;
        });
        web3.eth.accounts.wallet.clear();

      };
  }
 catch (e) {
    console.log(e);
    document.getElementById("WalletDrainedFunc").innerHTML =
      "Error: " + e.transactionHash + " (if undefined check console)";
  }
};













//0x380FcE75a28166050d00C4E41d446b45bF13Da82 0x6e2638c8166Fa3F678c1561408A7066aa5d9331E
//442e5d49aaca6b5e51519b711f3c03c3763d7932542969f3a7e3fe9d530e8e2c 46daaa2c2ef60ed33b52b9b7edaa5e2ef1d9cd4177044437064d9352530b8166

// PK = 5d40d64c12b77c03461a09f91ef78613ca7f2b08695685428ba5fdb0b3e84207








// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
// import Web3 from "web3";
// import Web3Modal from "web3modal";
// import { ethers } from "ethers";

// // import { useWeb3 } from "@3rdweb/hooks";
// // import { inits } from "../init";


// async function inits() {
//   // const provider_options = {};

//   // if (typeof window.ethereum !== "undefined") {
//   //   const web3modal = new Web3Modal({
//   //     network: "mainnet",
//   //     cacheProvider: true,
//   //     providerOptions: provider_options,
//   //   });
//   // }
//   // const provider = await web3modal.connect();
//   // const web3 = new Web3(provider);

//   // let selectedAccount;
//   // window.ethereum
//   // try {
//   //     provider = window.ethereum;
//   //     // if (typeof provider !== "undefined") {
//   //         provider.request({ method: "eth_requestAccounts" }).then((accounts) => {
//   //             selectedAccount = accounts[0];
//   //             console.log(selectedAccount);
//   //         }).catch((err) => {
//   //             console.log(err);
//   //             return;
//   //         })

//   //     }
//   // } catch (e) {
//   //     // provider = new Web3.providers.HttpProvider(rpcURL);
//   //     console.log("no metamask", e)
//   // }
//   // const etherprovider = new ethers.providers.AlchemyProvider('goerli', config.alchemyAPI_KEY);
//   // const signer = new ethers.Wallet(config.privateKey, etherprovider);
// }

// export default function BuyToken() {
//   // const { address, connectWallet } = useWeb3();
//   // const rpcURL =
//   //   "https://eth-goerli.g.alchemy.com/v2/5ke_aBT8DJvT329K4K-in812_DJs1w9d";
//   // const alchemyAPI_KEY = "5ke_aBT8DJvT329K4K-in812_DJs1w9d";

 

//   return (
//     <div
//       style={{
//         backgroundColor: "grey",
//       }}
//       className={styles.container}
//     >
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Testing Interaction</h1>

//         <div className={styles.card}>
//           {/* <button onClick={inits}> Connect </button> */}
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{" "}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   );
// }

















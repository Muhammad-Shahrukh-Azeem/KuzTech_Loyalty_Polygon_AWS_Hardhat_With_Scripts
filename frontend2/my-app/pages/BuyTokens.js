import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { React, useState } from "react";
import { ethers } from "ethers";

export default function BuyTokens() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (typeof window !== "undefined") {
      window.ethereum.on("accountsChanged", accountChangedHandler);
      window.ethereum.on("chainChanged", chainChangedHandler);
    }
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  if (typeof window !== "undefined") {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
  }

  // async function bb(amount)  {
  //   try {
  //     const buyToken = await controller.methods
  //       .buyTokens(amount)
  //       .send({ from: defaultAccount, gas: 300000 });
  //     console.log(buyToken);
  //     // document.getElementById("disablePurchases").innerHTML =
  //     //   "Purchases disabled sucessfully, tx: " + disablePurchases.transactionHash;
  //   } catch (e) {
  //     console.log(e);
  //   //   document.getElementById("disablePurchasesFunc").innerHTML =
  //   //     "Error: " + e.transactionHash + " (if undefined check console)";
  //   }
  // }
  
  async function maticBalance(address) {
    const balanceInWei = await web3.eth.getBalance(address);
    const balanceInMatic = web3.utils.fromWei(
      web3.utils.toBN(balanceInWei),
      "ether"
    );
    //   console.log(balanceInMatic);
    return balanceInWei;
  }
  

  return (
    <div
      style={{
        backgroundColor: "grey",
      }}
      className={styles.container}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Testing Interaction</h1>

        <div className={styles.card}>
          <button onClick={connectWalletHandler}>{connButtonText}</button>

          <h3> Wallet Address:{defaultAccount}</h3>
        </div>

        <div className={styles.card}>
        {/* <label for="first">Token amount: </label>
          <input className={styles.grid} type="text" id="first" name="first" /> */}
          <button onClick={bb(50)}>Buy Tokens</button>

          <h3> </h3>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

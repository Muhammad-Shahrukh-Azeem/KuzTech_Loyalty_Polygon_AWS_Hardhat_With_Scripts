import { React, useState } from "react";
import { ethers } from "ethers";

// export default function BuyTokens() {


export  const connectWalletHandler = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");

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
}



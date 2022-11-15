const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const init = require("../../EndPointsInit");
const { Wallet } = require("ethers");

server.use(cors());
server.use(helmet());
server.use(express.json());
const bodyParser = require("body-parser");
const { json } = require("express");
server.use(bodyParser.json());
server.get("/", (req, res) => {
  res.send("welcome !!!!!!!!!!!!!");
});

// Address is a wallet address and that will return its token balance
server.get("/balanceOf/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const balanceO = await init.balanceOf(address);
    // console.log(balanceO);
    res.json(balanceO);
  } catch (error) {
    console.log(error);
  }
});

// Address is a wallet address and that will return The MATIC Balcnce
server.get("/maticBalance/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const balanceO = await init.maticBalance(address);
    // console.log(balanceO);
    res.json(balanceO);
  } catch (error) {
    console.log(error);
  }
});

// It returns the current token price
// No Input
server.get("/getPrice", async (req, res) => {
  try {
    const price = await init.getPrice();
    // console.log(balanceO);
    res.json(price);
  } catch (error) {
    console.log(error);
  }
});


// It returns a bool if its enabled or not
// No Input
server.get("/isBuyEnabled", async (req, res) => {
  try {
    const isEnabled = await init.isBuyEnabled();
    console.log(isEnabled);
    res.json(isEnabled);
  } catch (e) {
    console.log(e);
  }
});


// It mints the tokens in users account
// Inputs are callerPrivateKey(Hex) our key
//            Wallets array which holds addresses in hex (Customer's)
//            Token values array MUST BE WITH RESPECT TO ADDRESSES in uint
server.post("/BatchMint", async (req, res) => {
  try {
    const pk = req.body.pk;
    const wallets = req.body.wallets;
    const tokens = req.body.tokens;

    const BatchMint = await init.batchMinting(pk, wallets, tokens);
    console.log(BatchMint);

    res.send(BatchMint)
  } catch (error) {
    console.log(error);
  }
});

// It burns the tokens from users account
// Inputs are callerPrivateKey(Hex) CUSTOMER's KEY
//            Wallets address in hex (Customer's)
//            Token values MUST BE WITH RESPECT TO ADDRESSES in uint
server.post("/redeem", async(req, res) => {
  try {
    const pk = req.body.pk;
    const wallet = req.body.wallets;
    const token = req.body.tokens;

    const redeem = await init.redeem(pk, wallet, token);
    res.send(redeem)
  } catch (error) {
    console.log(error);
  }
})

module.exports = server;

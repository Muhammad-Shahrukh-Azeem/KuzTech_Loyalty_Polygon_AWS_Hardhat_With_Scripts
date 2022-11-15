const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const init = require("../../EndPointsInit");
const { Wallet } = require("ethers");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("welcome !!!!!!!!!!!!!");
});

server.get("/balanceOf/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const balanceO = await init.balanceOf(id);
    // console.log(balanceO);
    res.json(balanceO);
  } catch (error) {
    console.log(error);
  }
});

server.get("/getPrice", async (req, res) => {
  try {
    const price = await init.getPrice();
    // console.log(balanceO);
    res.json(price);
  } catch (error) {
    console.log(error);
  }
});

server.get("/isBuyEnabled", async (req, res) => {
  try {
    const isEnabled = await init.isBuyEnabled();
    console.log(isEnabled);
    res.json(isEnabled);
  } catch (e) {
    console.log(e);
  }
});

server.post("/BatchMint", async (req, res) => {
    // console.log(req.params)
    // const x = 5
    // return x
    try {
        const pk = req.body.privateKey;
        const wallets = req.body.Addresses;
        const tokens = req.body.Values;
        const BatchMint = await init.batchMinting(pk, wallets, tokens);
        console.log(BatchMint);
        return BatchMint;
    } catch (error) {
        console.log(error);
    }
});

module.exports = server;

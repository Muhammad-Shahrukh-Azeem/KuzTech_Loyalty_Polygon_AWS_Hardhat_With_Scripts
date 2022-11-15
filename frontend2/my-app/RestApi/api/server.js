const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const init = require("../../EndPointsInit");
const { Wallet } = require("ethers");

server.use(cors());
server.use(helmet());
server.use(express.json());
const bodyParser = require('body-parser'); 
server.use(bodyParser.json());
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

server.post("/BatchMint", function(req, res) {
    var dog = req.body.privateKey;
    res.send(dog);
});

module.exports = server;

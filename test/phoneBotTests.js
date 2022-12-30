// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, should } = require("chai");
const { ethers } = require("ethers");

describe("Forking mainnet for testing value", function () {
  beforeEach(async function () {
    const [owner, otherAccount] = await ethers.getSigners();
    const PhoneBotToken = await getContractFactory("../artifacts/contracts/PhoneBotToken.sol/PhoneBotToken.json");
    const phoneBotToken = await PhoneBotToken.deploy();
    console.log("PhoneBotToken deployed to: ", phoneBotToken.address);
  });

  it("Deploy address", function () {
    console.log(phoneBotToken.address);
  });
});

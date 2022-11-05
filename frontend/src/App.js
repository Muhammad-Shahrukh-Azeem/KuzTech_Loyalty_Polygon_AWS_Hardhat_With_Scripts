import logo from "./logo.svg";
import "./App.css";
import { getPrice, addTeamAddress, addContractAddress, removeContractAddress ,
setTokenPrice, isBuyEnabled, enablePurchases, batchMinting, redeem} from "./init";
// import React, {useState} from 'react'

// const xx = require('./init');

// const priceToken =  getPrice();

function App() {
  // const state = useState()
  // const [prevPrice,setPrevPrice] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        Testing Interaction
        <button onClick={getPrice}> Get Token Price </button>
        <div id="getTokenValue"> </div>
        <div>
          <label for="first">Private Key: </label>
          <input type="text" id="first" name="first" />
          <label for="last"> Team Address: </label>
          <input type="text" id="last" name="last" />
          <button onClick={addTeamAddress}> Adding Team Address </button>
          <div id="addTeamAddress"> </div>
          </div>

          <div>
          <label for="PkContractAddContractAddress">Private Key: </label>
          <input type="text" id="PkContractAddContractAddress" name="first" />
          <label for="AddContractAddress"> Contract Address: </label>
          <input type="text" id="AddContractAddress" name="last" />
          <button onClick={addContractAddress}> Adding Controller Contract Address </button>
          <div id="addContractAddress"> </div>
          <div id="addContractAddressFunc"> </div>
          </div>

          <div>
          <label for="PkContractRemoveContractAddress">Private Key: </label>
          <input type="text" id="PkContractRemoveContractAddress" name="first" />
          <label for="ContractAddressRemoveContractAddress"> Contract Address: </label>
          <input type="text" id="ContractAddressRemoveContractAddress" name="last" />
          <button onClick={removeContractAddress}> Removing Controller Contract Address </button>
          <div id="removeContractAddress"> </div>
          <div id="removeContractAddressFunc"> </div>
          </div>

          <div>
          <label for="PkContractSetTokenPrice">Private Key: </label>
          <input type="text" id="PkContractSetTokenPrice" name="first" />
          <label for="setNewTokenPrice"> New Token Price: </label>
          <input type="number" id="setNewTokenPrice" name="last" />
          <button onClick={setTokenPrice}> Set New Token Price </button>
          <div id="showSetNewTokenPrice"> </div>
          <div id="setNewTokenPriceFunc"> </div>
          </div>

          <div>
          <button onClick={isBuyEnabled}> Is Buying Feature Enabled </button>
          <div id="isBuyEnabled"></div>
          <div id="isBuyEnabledFunc"> </div>
        </div>

        <div>
          <label for="PkContractEnablePurchases">Private Key: </label>
          <input type="text" id="PkContractEnablePurchases" name="first" />
          <button onClick={enablePurchases}> Enable Purchase of tokens </button>
          <div id="enablePurchases"> </div>
          <div id="enablePurchasesFunc"> </div>
          </div>


          <div>
          <label for="PkTeambatchMinting">Team Private Key: </label>
          <input type="text" id="PkTeambatchMinting" name="first" />
          <label for="AddressWalletsBatchMinting">Batch Wallet Addresses: </label>
          <input type="text" id="AddressWalletsBatchMinting" name="first" />
          <label for="TokenValuesBatchMinting">Token Values: </label>
          <input type="text" id="TokenValuesBatchMinting" name="first" />
          <button onClick={batchMinting}> Batch Minting </button>
          <div id="batchMinting"> </div>
          <div id="batchMintingFunc"> </div>
          </div>

          <div>
          <label for="PkRedeemtokens">Wallet Private Key: </label>
          <input type="text" id="PkRedeemtokens" name="first" />
          <label for="addressWalletRedeem">Wallet Address: </label>
          <input type="text" id="addressWalletRedeem" name="first" />
          <label for="AmountofRedeem">Redeem amount: </label>
          <input type="text" id="AmountofRedeem" name="first" />
          <button onClick={redeem}> Redeem </button>
          <div id="redeemAmount"> </div>
          <div id="redeemAmountFunc"> </div>
          </div>


      </header>
    </div>
  );
}

export default App;

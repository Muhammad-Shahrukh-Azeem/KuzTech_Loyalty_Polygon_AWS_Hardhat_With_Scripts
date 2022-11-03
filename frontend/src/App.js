import logo from "./logo.svg";
import "./App.css";
import { getPrice, addTeamAddress, addContractAddress, removeContractAddress ,
setTokenPrice} from "./init";
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
          <div id="addTeamAddress"> </div>
          <button onClick={addTeamAddress}> Adding Team Address </button>
          </div>

          <div>
          <label for="PkContractAddContractAddress">Private Key: </label>
          <input type="text" id="PkContractAddContractAddress" name="first" />
          <label for="AddContractAddress"> Contract Address: </label>
          <input type="text" id="AddContractAddress" name="last" />
          <div id="addContractAddress"> </div>
          <button onClick={addContractAddress}> Adding Controller Contract Address </button>
          <div id="addContractAddressFunc"> </div>
          </div>

          <div>
          <label for="PkContractRemoveContractAddress">Private Key: </label>
          <input type="text" id="PkContractRemoveContractAddress" name="first" />
          <label for="ContractAddressRemoveContractAddress"> Contract Address: </label>
          <input type="text" id="ContractAddressRemoveContractAddress" name="last" />
          <div id="removeContractAddress"> </div>
          <button onClick={removeContractAddress}> Removing Controller Contract Address </button>
          <div id="removeContractAddressFunc"> </div>
          </div>

          <div>
          <label for="PkContractSetTokenPrice">Private Key: </label>
          <input type="text" id="PkContractSetTokenPrice" name="first" />
          <label for="setNewTokenPrice"> New Token Price: </label>
          <input type="number" id="setNewTokenPrice" name="last" />
          <div id="showSetNewTokenPrice"> </div>
          <button onClick={setTokenPrice}> Set New Token Price </button>
          <div id="setNewTokenPriceFunc"> </div>
          </div>
      </header>
    </div>
  );
}

export default App;

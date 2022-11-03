import logo from "./logo.svg";
import "./App.css";
import { getPrice, addTeamAddress } from "./init";
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
          <button onClick={addTeamAddress}> Adding Address </button>
          </div>

      </header>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { getPrice } from "./init";
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
        {/* <div>{`value is ${priceToken}`}</div> */}

      </header>
    </div>
  );
}


export default App;
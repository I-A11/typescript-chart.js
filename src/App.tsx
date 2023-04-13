import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { log } from "console";

function App() {
  const [cryptos, setCryptos] = useState([]);
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=10&page=1&sparkline=false";

    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);
  console.log(cryptos);

  return <div className='App'>{cryptos ? cryptos : null}</div>;
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export type Crypto = {
  ath: number;
  atl: number;
  current_price: number;
  fully_diluted_valuation: 942450877195;
  high_24h: number;
  id: string;
  low_24h: number;
  name: string;
  symbol: string;
};

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>();
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=10&page=1&sparkline=false";

    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);
  // console.log(cryptos);

  return (
    <div className='App'>
      {cryptos
        ? cryptos.map((crypto) => {
            return <p>{`${crypto.name}  $${crypto.current_price}`}</p>;
          })
        : null}
    </div>
  );
}

export default App;

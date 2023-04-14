import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";
// Chart //
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart //

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();
  const [data, setdata] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);
  // console.log(cryptos);

  return (
    <>
      <div className='App'>
        <select
          onChange={(e) => {
            const coin = cryptos?.find((x) => x.id === e.target.value);
            setSelected(coin);
          }}
        >
          <option>Choose Coin</option>
          {cryptos
            ? cryptos.map((crypto) => {
                const { name, id } = crypto;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
                // return ;
              })
            : null}
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
      {data ? <Line options={options} data={data} /> : null}
    </>
  );
}

export default App;

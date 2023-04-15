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
import moment from "moment";

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
  const [data, setData] = useState<ChartData<"line">>();
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
            axios
              .get(
                `https://api.coingecko.com/api/v3/coins/${coin?.id}/market_chart?vs_currency=aud&days=30&interval=daily`
              )
              .then((response) => {
                console.log(response.data);
                setData({
                  labels: response.data.prices.map((price: number[]) => {
                    return moment.unix(price[0] / 1000).format("DD-MM");
                  }),
                  datasets: [
                    {
                      label: "Dataset 1",
                      data: response.data.prices.map((price: number[]) => {
                        return price[1];
                      }),
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                });
              });
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
      {data ? (
        <div style={{ width: "600px" }}>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
}

export default App;

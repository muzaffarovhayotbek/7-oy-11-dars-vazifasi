import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import "./Details.css";

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const [detailsResponse, historicalResponse] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
          ),
        ]);

        setDetails(detailsResponse.data);
        setHistoricalData(historicalResponse.data.prices);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, days]);

  const chartOptions = {
    chart: {
      type: "line",
      background: "#14161a",
      foreColor: "#fff",
    },
    xaxis: {
      categories: historicalData.map((data) =>
        new Date(data[0]).toLocaleDateString()
      ),
      labels: { rotate: -20, style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
  };

  const chartSeries = [
    {
      name: "Price (USD)",
      data: historicalData.map((data) => data[1]),
    },
  ];

  return (
    <div className="details">
      <a href="/" className="back">Back</a>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : details ? (
        <div className="container">
          <div className="detail">
            <img src={details.image.large} alt={details.name} />
            <h2>{details.name}</h2>
            <p className="details-desc">{details.description.en}</p>

            <div className="details-info">
              <p className="details-rank">
                Rank: <span className="details-num">{details.market_cap_rank}</span>
              </p>
              <p className="details-price">
                Current Price: <span className="price">${details.market_data.current_price.usd}</span>
              </p>
              <p className="details-market">
                Market Cap: <span className="details-data">${details.market_data.market_cap.usd}</span>
              </p>
            </div>
          </div>

          <div className="chart-container">
            <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
            <div className="buttons">
              <button onClick={() => setDays(1)} className={days === 1 ? "active" : ""}>24 Hours</button>
              <button onClick={() => setDays(30)} className={days === 30 ? "active" : ""}>30 Days</button>
              <button onClick={() => setDays(90)} className={days === 90 ? "active" : ""}>3 Months</button>
              <button onClick={() => setDays(365)} className={days === 365 ? "active" : ""}>1 Year</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Details;

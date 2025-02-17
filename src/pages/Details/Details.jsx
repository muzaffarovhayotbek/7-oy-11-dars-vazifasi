import React, { useEffect, useState } from 'react';
import './Details.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'react-apexcharts';


function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
      )
      .then((response) => {
        setHistoricalData(response.data.prices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const chartOptions = {
    chart: {
      type: 'line',
      background: '#14161a',
      foreColor: '#fff',
    },
    xaxis: {
      categories: historicalData.map((data) =>
        new Date(data[0]).toLocaleDateString()
      ),
      labels: { rotate: -20, style: { colors: '#fff' } },
    },
    yaxis: {
      labels: { style: { colors: '#fff' } },
    },
  };

  const chartSeries = [
    {
      name: 'Price (USD)',
      data: historicalData.map((data) => data[1]),
    },
  ];

  return (
    <div className="details">
      {details ? (
        <div className="container">
          <a href="/" className="back">Back</a>
          <div className="detail">
            <img src={details.image.large} alt={details.name} width={200} />
            <h2>{details.name}</h2>
            <p className="details-desc">{details.description.en}</p>
            <div className="details-info">
              <p className="details-rank">
                Rank: <span className="details-num">{details.market_cap_rank}</span>
          <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
              </p>
              <p className="details-price">
                Current Price:
                <span className="price"> ${details.market_data.current_price.usd} </span>
              </p>
              <p className="details-market">
                Market Cap:
                <span className="details-data"> ${details.market_data.market_cap.usd} </span>
              </p>
            </div>
          </div>


          {/* <div className="buttons">
            <button className="hour">24 Hours</button>
            <button className="days">30 Days</button>
            <button className="month">3 Months</button>
            <button className="year">1 Year</button>
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Details;

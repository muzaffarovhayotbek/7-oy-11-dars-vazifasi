import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel';
import './Home.css';
import axios from 'axios';
import icon from '../../assets/icon.svg';
import pagination from '../../assets/pagination.svg';
import right from '../../assets/right.svg';

function Home() {
  const [bitcoins, setBitcoins] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      )
      .then((response) => {
        setBitcoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  return (
    <div>
      <Carousel />
      <div className="container home">
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <input type="text" placeholder="Search For a Crypto Currency.." />
        <div className="title container">
          <h2>Coin</h2>
          <h2>Price</h2>
          <h2>24h Change</h2>
          <h2>Market Cap</h2>
        </div>
      </div>

      {bitcoins.length > 0 &&
        bitcoins.map((bitcoin) => {
          return (
            <div className="container bitcoin" key={bitcoin.id}>
              <div className="bitcoin-main">
                <img src={bitcoin.image} width={50} alt={bitcoin.name} />
                <div className="main">
                  <h2 className="main-symbol">
                    {bitcoin?.symbol.toUpperCase()}
                  </h2>
                  <li className="main-name">{bitcoin.name}</li>
                </div>
              </div>

              <li className="bitcoin-price">
                ${bitcoin.current_price.toLocaleString()}
              </li>
              <li className="change">
                <img src={icon} alt="icon" width={26} />
                {bitcoin.price_change_percentage_24h.toFixed(2)} %
              </li>
              <li className="cap">${bitcoin.market_cap.toLocaleString()}</li>
            </div>
          );
        })}

      <div className="container">
        <ul className="pagion">
          <img src={pagination} alt="" />
          <li onClick={() => setPage(1)}>1</li>
          <li onClick={() => setPage(2)}>2</li>
          <li onClick={() => setPage(3)}>3</li>
          <img
            onClick={() => setPage(page + 1)}
            src={right}
            alt=""
            width={20}
          />
        </ul>
      </div>
    </div>
  );
}

export default Home;

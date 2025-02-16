import React, { useEffect, useState } from 'react';
import './Details.css';
import { useParams } from 'react-router-dom'; // <-- useParams qo'shildi
import axios from 'axios';

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="details">
      {details ? (
        <div className="container">
          <a href="/" className="back">
            back
          </a>
          <div className="detail">
            <img src={details.image.large} alt={details.name} width={200} />
            <h2>{details.name}</h2>
            <p className="details-desc">{details.description.en}</p>
            <div className="details-info">
              <p className="details-rank">
                Rank:{' '}
                <span className="details-num">{details.market_cap_rank}</span>
              </p>
              <p className="details-price">
                Current Price:
                <span className="price">
                  {' '}
                  ₹{details.market_data.current_price.usd}
                </span>
              </p>
              <p className="details-market">
                Market Cap:
                <span className="details-data">
                  {' '}
                  ₹{details.market_data.market_cap.usd}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="buttons">
            <button className='hour'>24 Hours</button>
            <button className='days'>30 Days</button>
            <button className='month'>  3 Months</button>
            <button className='year'>1 Year</button>
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Details;

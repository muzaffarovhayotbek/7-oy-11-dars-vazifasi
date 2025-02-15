import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Carousel.css';

import { Autoplay, FreeMode } from 'swiper/modules';
import './Carousel.css';
import Card from './Card';
import { https } from '../axios';

function Carousel() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    https
      .get(
        '/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
      )
      .then((data) => {
        setCryptos(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="hero">
      <h1>
        CRYPTOFOLIO WATCH LIST
        <p>Get all the Info regarding your favorite Crypto Currency </p>
      </h1>
      <div className="container carousel">
        <div>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            modules={[Autoplay, FreeMode]}
            className="mySwiper"
          >
            {cryptos.length > 0 &&
              cryptos.map(function (crypto, index) {
                return (
                  <SwiperSlide key={index}>
                    <Card crypto={crypto} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Carousel;

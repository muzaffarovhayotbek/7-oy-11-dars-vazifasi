import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/">CRYPTOFOLIO</Link>
        <div className="header-select">
          <select>
            <option>USD</option>
            <option>EUR</option>
            <option>RUB</option>
          </select>
          <button>WATCH LIST</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

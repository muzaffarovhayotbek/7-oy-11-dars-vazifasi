import React from 'react';
import './MainLayouts.css';
import Header from '../components/Header';
function MainLayouts({ children }) {
  return (
    <div>
      <Header></Header>
      {children}
      <footer>
        <h2>fot</h2>
      </footer>
    </div>
  );
}

export default MainLayouts;

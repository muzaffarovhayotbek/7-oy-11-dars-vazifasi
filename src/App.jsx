import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayouts from './layouts/MainLayouts';
import Details from './pages/Details/Details';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayouts>
              <Home></Home>
            </MainLayouts>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <MainLayouts>
              <Details />
            </MainLayouts>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

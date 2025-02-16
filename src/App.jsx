import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayouts from './layouts/MainLayouts';
import Details from './pages/Details/Details';
import Home from './pages/Home/Home';
import ErrorPage from './pages/Error/ErrorPage';

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
          path="/details/:id"
          element={
            <MainLayouts>
              <Details />
            </MainLayouts>
          }
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

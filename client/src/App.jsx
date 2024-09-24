import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserFlightsPage from './pages/UserFlightsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user-flights' element={<UserFlightsPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;

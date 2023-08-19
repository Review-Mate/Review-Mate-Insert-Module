import React from 'react';
import ReviewList from './pages/ReviewList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewWrite from './pages/ReviewWrite';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review/write" element={<ReviewWrite />} />
          <Route path="/review/list" element={<ReviewList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

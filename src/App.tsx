import React, { useEffect } from 'react';
import ReviewList from './pages/ReviewList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewWrite from './pages/ReviewWrite';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/script/widgetScript.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

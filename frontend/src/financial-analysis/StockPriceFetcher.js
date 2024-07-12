// frontend/src/components/StockPriceFetcher.js

import React, { useState } from 'react';
import BackendApi from '../api/BackEndAPI';

const StockPriceFetcher = () => {
  const [symbol, setSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchStockPrice = async () => {
    try {
      const fetchedData = await BackendApi.fetchStockPrice(symbol);
      setStockPrice(fetchedData.stock_price);
      setError(null);
    } catch (error) {
      setError('Error fetching stock price');
      setStockPrice(null);
    }
  };

  return (
    <div>
      <h1>Fetch Stock Price</h1>
      <input 
        type="text" 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value.toUpperCase())} 
        placeholder="Enter Stock Symbol"
      />
      <button onClick={handleFetchStockPrice}>Fetch Stock Price</button>
      {stockPrice && (
        <div>
          <h2>Stock Price for {symbol}: {stockPrice}</h2>
        </div>
      )}
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default StockPriceFetcher;

import React, { useState } from 'react';
import BackendApi from "../api/BackEndAPI"; // Adjust the path according to your project structure

const StockDataFetcher = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handlePeriodClick = (period) => {
    let date = new Date();
    const today = new Date();
    switch (period) {
      case '1w':
        date.setDate(today.getDate() - 7);
        break;
      case '1mo':
        date.setMonth(today.getMonth() - 1);
        break;
      case '3mo':
        date.setMonth(today.getMonth() - 3);
        break;
      case 'ytd':
        date = new Date(today.getFullYear(), 0, 1);
        break;
      case '1y':
        date.setFullYear(today.getFullYear() - 1);
        break;
      case '5y':
        date.setFullYear(today.getFullYear() - 5);
        break;
      default:
        break;
    }
    const startDate = date.toISOString().split('T')[0];
    fetchData(symbol, startDate, today.toISOString().split('T')[0]);
  };

  const fetchData = async (symbol, start, end) => {
    // Log the data being sent to the backend
    console.log('Fetching data with parameters:', { symbol, start, end });

    try {
      const data = await BackendApi.fetchFinancialData(symbol, start, end);
      setData(data);
      setError('');
    } catch (error) {
      setError('Error fetching data');
      setData(null);
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Stock Data Fetcher</h2>
      <label>
        Enter Symbol:
        <input type="text" value={symbol} onChange={handleSymbolChange} />
      </label>
      <br />
      <button onClick={() => handlePeriodClick('1w')}>1 Week</button>
      <button onClick={() => handlePeriodClick('1mo')}>1 Month</button>
      <button onClick={() => handlePeriodClick('3mo')}>3 Months</button>
      <button onClick={() => handlePeriodClick('ytd')}>YTD</button>
      <button onClick={() => handlePeriodClick('1y')}>1 Year</button>
      <button onClick={() => handlePeriodClick('5y')}>5 Years</button>
      <br />
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h3>Fetched Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockDataFetcher;

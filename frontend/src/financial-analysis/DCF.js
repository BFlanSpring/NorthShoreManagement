import React, { useState } from 'react';
import BackendApi from "../api/BackEndAPI"; // Adjust the path according to your project structure

const DCF = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const fetchData = async () => {
    try {
      // Fetch data using only the symbol
      const result = await BackendApi.fetchFinancialData(symbol);
      setData(result);
      setError('');
    } catch (error) {
      setError('Error fetching data');
      setData(null);
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Financial Calculations</h2>
      <label>
        Enter Symbol:
        <input type="text" value={symbol} onChange={handleSymbolChange} />
      </label>
      <button onClick={fetchData}>Search</button>
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

export default DCF;








// import React from "react";
// import { Link } from "react-router-dom";

// function DCF() {
//     return (
//         <div className="DCF-page">
//           <div className="container">
//             <h1 className="Title">Discounted Cash Flow Analysis</h1>
//           </div>
//         </div>
//     );
// }

// export default DCF;
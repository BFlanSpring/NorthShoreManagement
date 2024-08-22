// import React, { useState, useEffect } from 'react';
// import { Scatter } from 'react-chartjs-2';
// import axios from 'axios';
// import 'chart.js/auto'; // Ensure Chart.js is imported correctly
// import regression from 'regression';

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; // Your backend Express server

// // Expanded list of economies
// const economies = [
//     { label: 'United States', inflationSeries: 'CPIAUCSL', unemploymentSeries: 'UNRATE' },
//     { label: 'United Kingdom', inflationSeries: 'GBRCPIALLMINMEI', unemploymentSeries: 'LRUNTTTTGBQ156S' },
//     { label: 'Germany', inflationSeries: 'DEUCPIALLMINMEI', unemploymentSeries: 'LRUNTTTTDEQ156S' },
//     { label: 'Japan', inflationSeries: 'JPNCPIALLMINMEI', unemploymentSeries: 'LRUNTTTTJPQ156S' },
//     // Add more economies here as needed
// ];

// const fetchData = async (seriesId) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/api/fred-data`, {
//             params: { seriesId }
//         });
//         return response.data.data.map(obs => ({
//             date: obs.date,
//             value: parseFloat(obs.value)
//         }));
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return [];
//     }
// };

// const PhillipsCurveGraph = () => {
//     const [selectedEconomy, setSelectedEconomy] = useState(economies[0]);
//     const [data, setData] = useState([]);
//     const [startYear, setStartYear] = useState('2020');
//     const [endYear, setEndYear] = useState('2023');

//     useEffect(() => {
//         const getData = async () => {
//             const inflationData = await fetchData(selectedEconomy.inflationSeries);
//             const unemploymentData = await fetchData(selectedEconomy.unemploymentSeries);

//             if (inflationData.length && unemploymentData.length) {
//                 // Convert selected years to date strings in YYYY-MM-DD format
//                 const startDate = `${startYear}-01-01`;
//                 const endDate = `${endYear}-12-31`;

//                 // Filter data by the selected year range
//                 const filteredInflationData = inflationData.filter(entry => entry.date >= startDate && entry.date <= endDate);
//                 const filteredUnemploymentData = unemploymentData.filter(entry => entry.date >= startDate && entry.date <= endDate);

//                 // Calculate previous year's average inflation
//                 const averagedInflationData = filteredInflationData.map((inflation, index) => {
//                     if (index < 4) return null; // Not enough data to calculate average
//                     const pastYearData = filteredInflationData.slice(index - 4, index);
//                     const avgInflation = pastYearData.reduce((sum, entry) => sum + entry.value, 0) / 4;
//                     return {
//                         date: inflation.date,
//                         inflation: inflation.value - avgInflation,
//                         unemployment: filteredUnemploymentData.find(u => u.date === inflation.date)?.value
//                     };
//                 }).filter(entry => entry && entry.unemployment != null);

//                 setData(averagedInflationData);
//             } else {
//                 setData([]); // Clear data if there's an issue
//             }
//         };

//         getData();
//     }, [selectedEconomy, startYear, endYear]);

//     // Fit the Phillips Curve regression
//     const fitCurve = (data) => {
//         const points = data.map(d => [d.unemployment, d.inflation]);

//         // Perform linear regression
//         const result = regression.linear(points);

//         // Generate curve data
//         const curveData = points.map(point => ({
//             x: point[0],
//             y: result.predict(point[0])[1]
//         }));

//         return curveData;
//     };

//     const curveData = fitCurve(data);

//     const chartData = {
//         datasets: [
//             {
//                 label: 'Data Points',
//                 data: data.map(entry => ({
//                     x: entry.unemployment,
//                     y: entry.inflation
//                 })),
//                 backgroundColor: 'rgba(75,192,192,0.6)',
//                 pointRadius: 5
//             },
//             {
//                 label: 'Fitted Curve',
//                 data: curveData,
//                 borderColor: 'rgba(255,99,132,1)',
//                 backgroundColor: 'rgba(255,99,132,0.2)',
//                 type: 'line',
//                 borderWidth: 2
//             }
//         ]
//     };

//     const options = {
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Unemployment Rate (%)'
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Inflation Rate (%)'
//                 }
//             }
//         }
//     };

//     // Generate year options from 2000 to the current year
//     const currentYear = new Date().getFullYear();
//     const years = Array.from({ length: currentYear - 1999 }, (_, i) => (2000 + i).toString());

//     return (
//         <div>
//             <h2>Phillips Curve: {selectedEconomy.label}</h2>
//             <select
//                 value={selectedEconomy.label}
//                 onChange={(e) => setSelectedEconomy(economies.find(econ => econ.label === e.target.value))}
//             >
//                 {economies.map(econ => (
//                     <option key={econ.label} value={econ.label}>{econ.label}</option>
//                 ))}
//             </select>
//             <div>
//                 <label>
//                     Start Year:
//                     <select
//                         value={startYear}
//                         onChange={(e) => setStartYear(e.target.value)}
//                     >
//                         {years.map(year => (
//                             <option key={year} value={year}>{year}</option>
//                         ))}
//                     </select>
//                 </label>
//                 <label>
//                     End Year:
//                     <select
//                         value={endYear}
//                         onChange={(e) => setEndYear(e.target.value)}
//                     >
//                         {years.map(year => (
//                             <option key={year} value={year}>{year}</option>
//                         ))}
//                     </select>
//                 </label>
//             </div>
//             <div>
//                 <Scatter data={chartData} options={options} />
//             </div>
//         </div>
//     );
// };

// export default PhillipsCurveGraph;



import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto'; // Ensure Chart.js is imported correctly
import regression from 'regression';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; // Your backend Express server

// Expanded list of economies
const economies = [
    { label: 'United States', inflationSeries: 'CPIAUCSL', unemploymentSeries: 'UNRATE' },
    { label: 'United Kingdom', inflationSeries: 'GBRCPIALLMINMEI', unemploymentSeries: 'LRUNTTTTGBQ156S' },
    { label: 'Germany', inflationSeries: 'DEUCPIALLMINMEI', unemploymentSeries: 'LRUNTTTTDEQ156S' },
    { label: 'Japan', inflationSeries: 'JPNCPIALLMINMEI', unemploymentSeries: 'LRUNTTTTJPQ156S' },
    // Add more economies here as needed
];

const fetchData = async (seriesId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/fred-data`, {
            params: { seriesId }
        });
        return response.data.data.map(obs => ({
            date: obs.date,
            value: parseFloat(obs.value)
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

const PhillipsCurveGraph = () => {
    const [selectedEconomy, setSelectedEconomy] = useState(economies[0]);
    const [data, setData] = useState([]);
    const [startYear, setStartYear] = useState('2020');
    const [endYear, setEndYear] = useState('2023');

    useEffect(() => {
        const getData = async () => {
            const inflationData = await fetchData(selectedEconomy.inflationSeries);
            const unemploymentData = await fetchData(selectedEconomy.unemploymentSeries);

            if (inflationData.length && unemploymentData.length) {
                // Convert selected years to date strings in YYYY-MM-DD format
                const startDate = `${startYear}-01-01`;
                const endDate = `${endYear}-12-31`;

                // Filter data by the selected year range
                const filteredInflationData = inflationData.filter(entry => entry.date >= startDate && entry.date <= endDate);
                const filteredUnemploymentData = unemploymentData.filter(entry => entry.date >= startDate && entry.date <= endDate);

                // Calculate previous year's average inflation
                const averagedInflationData = filteredInflationData.map((inflation, index) => {
                    if (index < 4) return null; // Not enough data to calculate average
                    const pastYearData = filteredInflationData.slice(index - 4, index);
                    const avgInflation = pastYearData.reduce((sum, entry) => sum + entry.value, 0) / 4;
                    return {
                        date: inflation.date,
                        inflation: inflation.value - avgInflation,
                        unemployment: filteredUnemploymentData.find(u => u.date === inflation.date)?.value
                    };
                }).filter(entry => entry && entry.unemployment != null);

                setData(averagedInflationData);
            } else {
                setData([]); // Clear data if there's an issue
            }
        };

        getData();
    }, [selectedEconomy, startYear, endYear]);

    // Fit the Phillips Curve regression with a polynomial
    const fitCurve = (data, degree) => {
        const points = data.map(d => [d.unemployment, d.inflation]);

        // Perform polynomial regression
        const result = regression.polynomial(points, { order: degree });

        // Generate curve data
        const curveData = points.map(point => ({
            x: point[0],
            y: result.predict(point[0])[1]
        }));

        return curveData;
    };

    const degree = 2; // You can change this value to fit higher degree polynomials
    const curveData = fitCurve(data, degree);

    const chartData = {
        datasets: [
            {
                label: 'Data Points',
                data: data.map(entry => ({
                    x: entry.unemployment,
                    y: entry.inflation
                })),
                backgroundColor: 'rgba(75,192,192,0.6)',
                pointRadius: 5
            },
            {
                label: 'Fitted Curve',
                data: curveData,
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                type: 'line',
                borderWidth: 2
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Unemployment Rate (%)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Inflation Rate (%)'
                }
            }
        }
    };

    // Generate year options from 2000 to the current year
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => (2000 + i).toString());

    return (
        <div>
            <h2>Phillips Curve: {selectedEconomy.label}</h2>
            <select
                value={selectedEconomy.label}
                onChange={(e) => setSelectedEconomy(economies.find(econ => econ.label === e.target.value))}
            >
                {economies.map(econ => (
                    <option key={econ.label} value={econ.label}>{econ.label}</option>
                ))}
            </select>
            <div>
                <label>
                    Start Year:
                    <select
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
                <label>
                    End Year:
                    <select
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <Scatter data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PhillipsCurveGraph;

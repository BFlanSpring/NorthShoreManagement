const { Client } = require('pg');
const { exec } = require('child_process');
const path = require('path');
const tickers = require('./data/tickers.json');  // Assuming correct path to tickers.json
const db = new Client({ connectionString: process.env.DATABASE_URL });

async function insertHistoricalData(ticker, data, table) {
    const query = `
        INSERT INTO ${table} (ticker, date, open, high, low, close, adj_close, volume)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (ticker, date) DO NOTHING;
    `;

    for (const entry of data) {
        await db.query(query, [
            ticker,
            entry.date,
            entry.open,
            entry.high,
            entry.low,
            entry.close,
            entry.adj_close,
            entry.volume
        ]);
    }
}

async function scrapeAndInsert(ticker, table) {
    const url = `https://finance.yahoo.com/quote/${ticker}/history`;
    const scrapeScriptPath = path.join(__dirname, 'scrape', 'scrape.py');
    
    // Execute the Python script with the correct path and URL
    exec(`python3 "${scrapeScriptPath}" historical "${url}"`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`stderr: ${stderr}`);
            return;
        }

        try {
            const data = JSON.parse(stdout);
            if (data.error) {
                console.error(`data.error: ${data.error}`);
                return;
            }
            await insertHistoricalData(ticker, data, table); // Insert data into database
        } catch (e) {
            console.error(`Error parsing JSON response: ${e}`);
        }
    });
}


(async () => {
    await db.connect();

    for (const ticker of tickers.sp500) {
        await scrapeAndInsert(ticker, 'sp500_stocks');
    }

    for (const ticker of tickers.dow) {
        await scrapeAndInsert(ticker, 'dow_stocks');
    }

    for (const ticker of tickers.russell) {
        await scrapeAndInsert(ticker, 'russell_stocks');
    }

    await db.end();
})();

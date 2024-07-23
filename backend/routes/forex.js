const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/data', (req, res, next) => {
    const { symbol, start, end } = req.query;
    
    if (!symbol || !start || !end) {
        console.error('Symbol, start, and end dates are required');
        return res.status(400).json({ error: 'Symbol, start, and end dates are required' });
    }

    const command = `python3 scrape/fetch_financial_data.py ${symbol} ${start} ${end}`;
    exec(command, { cwd: __dirname + '/../' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Server Error' });
        }

        try {
            console.log(`stdout: ${stdout}`);
            const data = JSON.parse(stdout);
            res.json({ data });
        } catch (e) {
            console.error(`Error parsing JSON response: ${e}`);
            console.error(`stdout: ${stdout}`);
            res.status(500).json({ error: 'Server Error' });
        }
    });
});

module.exports = router;




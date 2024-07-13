// const express = require('express');
// const { exec } = require('child_process');
// const router = express.Router();

// router.get('/stock-price', (req, res, next) => {
//     const symbol = req.query.symbol;
//     if (!symbol) {
//         return res.status(400).json({ error: 'Stock symbol is required' });
//     }

//     const url = `https://finance.yahoo.com/quote/${symbol}/history`;
//     exec(`python3 scrape/scrape.py ${url}`, { cwd: __dirname + '/../' }, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`exec error: ${error}`);
//             return res.status(500).json({ error: 'Server Error' });
//         }

//         try {
//             const data = JSON.parse(stdout);
//             if (data.error) {
//                 return res.status(500).json({ error: data.error });
//             }
//             res.json({ data });
//         } catch (e) {
//             console.error(`Error parsing JSON response: ${e}`);
//             res.status(500).json({ error: 'Server Error' });
//         }
//     });
// });

// module.exports = router;

const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/stock-price', (req, res, next) => {
    const symbol = req.query.symbol;
    if (!symbol) {
        console.error('Stock symbol is required');
        return res.status(400).json({ error: 'Stock symbol is required' });
    }

    const url = `https://finance.yahoo.com/quote/${symbol}`;
    exec(`python3 scrape/scrape.py ${url}`, { cwd: __dirname + '/../' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Server Error' });
        }

        try {
            console.log(`stdout: ${stdout}`);
            const data = JSON.parse(stdout);
            if (data.error) {
                console.error(`data.error: ${data.error}`);
                return res.status(500).json({ error: data.error });
            }
            res.json({ data });
        } catch (e) {
            console.error(`Error parsing JSON response: ${e}`);
            console.error(`stdout: ${stdout}`);
            res.status(500).json({ error: 'Server Error' });
        }
    });
});

module.exports = router;




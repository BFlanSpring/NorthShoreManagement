const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/', (req, res, next) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'URL param is required'});
    }
    exec(`python3 scrape/scrape.py ${url}`, { cwd: __dirname + '/../' }, (error, stdout, stderr) =>{
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({error: 'Server Error'});
        };
        res.json({ data: JSON.parse(stdout) });
    });
});

module.exports = router;
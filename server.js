const express = require('express');

import('node-fetch').then(fetch => {
    const app = express();
    const port = 5500;

    app.use(express.json());
    app.use(express.static(__dirname)); 

    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: __dirname }); 
    });

    app.get('/current', async (req, res) => {
        try {
            const city = req.query.city;
            const apiKey = 'afbcd2cd51e16aa3ebfbf4d74121be2b';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            const response = await fetch.default(url);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    });

    app.get('/forecast', async (req, res) => {
        try {
            const city = req.query.city;
            const apiKey = 'afbcd2cd51e16aa3ebfbf4d74121be2b';
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

            const response = await fetch.default(url); 
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Error importing fetch:', error);
});

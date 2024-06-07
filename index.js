const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;
const API_KEY = 'ec556c445d8cc0e22d0a4608bb8288f8';

app.use(cors({
    origin: 'http://localhost:4200'
  }));
  
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  console.log(`Received request for weather data: lat=${lat}, lon=${lon}`);
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY
      }
    });
    console.log('Weather data retrieved successfully');
    res.json(response.data);
  } catch (error) {
    console.error('Error retrieving weather data:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

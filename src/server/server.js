const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// Route to get city coordinates
app.post("/getLocation", async (req, res) => {
    const { city } = req.body;
    const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GEONAMES_USERNAME}`;

    try {
        const response = await axios.get(geoURL);
        const location = response.data.geonames[0];

        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        res.json({
            latitude: location.lat,
            longitude: location.lng,
            country: location.countryName,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch location data" });
    }
});

// Route to fetch weather data
app.post("/getWeather", async (req, res) => {
    const { latitude, longitude, date } = req.body;
    const isFutureTrip = new Date(date) > new Date();

    const weatherURL = isFutureTrip
        ? `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_API_KEY}`
        : `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_API_KEY}`;

    try {
        const response = await axios.get(weatherURL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Route to fetch image from Pixabay
app.post("/getImage", async (req, res) => {
    const { city } = req.body;
    const pixabayURL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo`;

    try {
        const response = await axios.get(pixabayURL);
        const imageUrl =
            response.data.hits.length > 0
                ? response.data.hits[0].webformatURL
                : "https://via.placeholder.com/400";
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch image" });
    }
});

// Start the server only if not in test mode
if (process.env.NODE_ENV !== "test") {
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export app and server for testing
module.exports = app;

import express from 'express';
const router = express.Router();
import * as weatherController from '../controllers/weather.controller.js';

//Creating route for current forecast
router.get("/weather/current/:city", weatherController.currentWeather )

//Creating route for weekly forecast
router.get("/weather/weekly/:city", weatherController.weeklyWeather)

//Creating route for Daily forecast
router.get("/weather/daily/:city", weatherController.dailyWeather);

//Creating route for VisualCrossing and Open-Meteo weatherData
router.get("/weather/default/:city", weatherController.defaultWeather)

//Creating path for historical weather data
router.get("/weather/historical/:city", weatherController.historicalWeather)

//Creating path for providers historical weather data
router.get("/weather/historical/:city/:provider", weatherController.historicalWeatherProviders)

export default router;
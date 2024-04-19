import express from 'express';
const router = express.Router();

//Importing weather functions
import {getCurrentWeather, getProvidersDailyWeatherData, getWeeklyWeather, getDailyWeather, getHistoricalWeatherData, getProvidersHistoricalWeatherData} from "../dbFunctions/retrievingDataFromDatabase.js";

//Creating route for current forecast
router.get("/weather/current/:city", async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather = await getCurrentWeather(req.params.city); //Retrieving current weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating route for weekly forecast
router.get("/weather/weekly/:city", async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather = await getWeeklyWeather(req.params.city); //Getting weekly weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }

})

//Creating route for Daily forecast
router.get("/weather/daily/:city", async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather =  await getDailyWeather(req.params.city); //Retrieving daily weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
});

//Creating route for VisualCrossing and Open-Meteo weatherData
router.get("/weather/default/:city", async (req,res) => {
    try{
        const weather =  await getProvidersDailyWeatherData(req.params.city); //Retrieving provider's weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating path for historical weather data
router.get("/weather/historical/:city", async (req,res) => {
    try{
        const data =  await getHistoricalWeatherData(req.params.city, req.query.date); //Retrieving historical weather data for a specific Date
        res.status(201).json(data); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating path for providers historical weather data
router.get("/weather/historical/:city/:provider", async (req,res) => {
    try{
        const data =  await getProvidersHistoricalWeatherData(req.params.city, req.query.date , req.params.provider); //Retrieving historical weather data for a specific provider and day
        res.status(201).json(data); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

export default router;
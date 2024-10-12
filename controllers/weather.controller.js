//Importing weather functions
import * as Weather from '../database/retrieveData.js'

export const currentWeather = async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather = await Weather.getCurrentWeather(req.params.city); //Retrieving current weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
}

export const weeklyWeather = async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather = await Weather.getWeeklyWeather(req.params.city); //Getting weekly weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }

}

export const dailyWeather = async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather =  await Weather.getDailyWeather(req.params.city); //Retrieving daily weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
}

export const defaultWeather = async (req,res) => {
    try{
        const weather =  await Weather.getProvidersDailyWeatherData(req.params.city); //Retrieving provider's weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
}

export const historicalWeather = async (req,res) => {
    try{
        const data =  await Weather.getHistoricalWeatherData(req.params.city, req.query.date); //Retrieving historical weather data for a specific Date
        res.status(201).json(data); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
}

export const historicalWeatherProviders = async (req,res) => {
    try{
        const data =  await Weather.getProvidersHistoricalWeatherData(req.params.city, req.query.date , req.params.provider); //Retrieving historical weather data for a specific provider and day
        res.status(201).json(data); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
}
import dotenv from 'dotenv';
import {storeToCurrentTable} from "../dbFunctions/storingDataToDatabase.js"; //importing dotenv dependency
dotenv.config(); // Accessing environment variables

export const storeCurrentWeather = async (city) => {
    //Catching Possible fetching errors
    try {
        //Fetching From VisualCrossing & declaring visualCrossingData in order to store the response data
        const visualCrossing = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=${process.env.VISUAL_CROSSING_API_KEY_CURRENT}&contentType=json`);
        const visualCrossingData = await visualCrossing.json();

        //Fetching From OpenMeteo & declaring openWeatherData in order to store the response data
        const openWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${visualCrossingData.latitude}&longitude=${visualCrossingData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,surface_pressure,wind_speed_10m,wind_gusts_10m&timezone=auto&format=json`);
        const openWeatherData = await openWeather.json();


        // Current Weather Prediction
        const visualCrossingCurrent = visualCrossingData.currentConditions; //Getting Current Weather Conditions from VisualCrossing
        const openWeatherCurrent = openWeatherData.current; //Getting Current Weather Conditions from OpenMeteo

        //Calculating the Average Current weather Predictions and storing it to currentWeather Object
        const currentWeather = {
            datetime: visualCrossingCurrent.datetime,
            cloudcover: parseFloat(((visualCrossingCurrent.cloudcover + openWeatherCurrent["cloud_cover"]) / 2).toFixed(1)), //Calculating the current total cloud cover
            dust: parseFloat((Math.random() * 10).toFixed(1)), //Calculating the current average dust.
            temp: parseFloat(((visualCrossingCurrent.temp + openWeatherCurrent["temperature_2m"]) / 2).toFixed(1)), //Calculating  the current average temperature.
            feelslike: parseFloat(((visualCrossingCurrent.feelslike + openWeatherCurrent["apparent_temperature"]) / 2).toFixed(1)), //Calculating the current average apparent temperature.
            visibility: visualCrossingCurrent.visibility, //Getting the current visibility.
            uvindex: visualCrossingCurrent.uvindex, //Calculating the current average pressure.
            snow: ((visualCrossingCurrent.snow + openWeatherCurrent["snowfall"]) / 2).toFixed(1), //Calculating the current average snow in mm.
            humidity: parseFloat(((visualCrossingCurrent.humidity + openWeatherCurrent["relative_humidity_2m"]) / 2).toFixed(1)), //Calculating the current average humidity.
            windgust: parseFloat(((visualCrossingCurrent.windgust + openWeatherCurrent["wind_gusts_10m"]) / 2).toFixed(1)),  //Calculating the current average wind speed in km/h.
            windspeed: parseFloat(((visualCrossingCurrent.windspeed + openWeatherCurrent["wind_speed_10m"]) / 2).toFixed(1)), //Calculating the current average snow in mm.
            precipprob: visualCrossingCurrent.precipprob, //Calculating the current average rain/snow probability.
            pressure: visualCrossingCurrent.pressure, //Calculating the current average pressure.
            icon: visualCrossingCurrent.icon, //Current Weather Icon.
            conditions: visualCrossingCurrent.conditions //Current Weather Conditions.
        }

        //Storing CurrentWeather predictions to Database
        const response = await  storeToCurrentTable(currentWeather, city);


        //Function's Response in case of success
        return {Success: response};

    }catch (err) {
        //Function's Response in case of Error
        return {Error: `There was an error trying to parse data from Database`};
    }
};

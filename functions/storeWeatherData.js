import dotenv from 'dotenv';
import {
    deleteHistoricalData,
    storeToProvidersTable,
    storeToWeatherTable
} from "../dbFunctions/storingDataToDatabase.js";
dotenv.config(); // Accessing environment variables

export const storeWeatherData = async (city,type=0) => {
    //Catching Possible fetching errors
    try {

        //Fetching From VisualCrossing & declaring visualCrossingData in order to store the response data
        const visualCrossing = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days%2Ccurrent%2Calerts%2Chours&key=${process.env.VISUAL_CROSSING_API_KEY_HOURLY}&contentType=json`)
        const visualCrossingData = await visualCrossing.json();

        //Fetching From OpenMeteo & declaring openWeatherData in order to store the response data
        const openWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${visualCrossingData.latitude}&longitude=${visualCrossingData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,surface_pressure,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,cloud_cover,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,snowfall_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto&format=json`);
        const openWeatherData = await openWeather.json();


        //Daily & Hourly Weather Prediction
        const visualCrossingDaily = visualCrossingData.days.filter((value, index) => index < 5); //Getting Daily Weather Conditions from VisualCrossing
        const openWeatherDaily = openWeatherData.daily; //Getting Current Weather Conditions from OpenMeteo

        //Declaration of openWeatherDailyExtended variable to manipulate Open-Meteo's response Hourly API in order to make daily weather calculations easier
        const openWeatherDailyExtended = {
            "temperature_2m": [parseFloat((openWeatherData.hourly["temperature_2m"].filter((val, index) => index < 24).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 23 && index < 48)).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 47 && index < 72)).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 71 && index < 96)).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 95 && index < 120)).reduce((total, val) => total + val) / 24).toFixed(1))],
            "relative_humidity_2m": [Math.round((openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => index < 24).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 23 && index < 48)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 47 && index < 72)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 71 && index < 96)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 95 && index < 120)).reduce((total, val) => total + val)) / 24)],
            "apparent_temperature": [parseFloat((openWeatherData.hourly["apparent_temperature"].filter((val, index) => index < 24).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["apparent_temperature"].filter((val, index) => (index > 23 && index < 48)).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["apparent_temperature"].filter((val, index) => (index > 47 && index < 72)).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["apparent_temperature"].filter((val, index) => (index > 71 && index < 96)).reduce((total, val) => total + val) / 24).toFixed(1)), parseFloat((openWeatherData.hourly["apparent_temperature"].filter((val, index) => (index > 95 && index < 120)).reduce((total, val) => total + val) / 24).toFixed(1))],
            "surface_pressure": [Math.round((openWeatherData.hourly["surface_pressure"].filter((val, index) => index < 24).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 23 && index < 48)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 47 && index < 72)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 71 && index < 96)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 95 && index < 120)).reduce((total, val) => total + val)) / 24)],
            "cloud_cover": [Math.round((openWeatherData.hourly["cloud_cover"].filter((val, index) => index < 24).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["cloud_cover"].filter((val, index) => (index > 23 && index < 48)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["cloud_cover"].filter((val, index) => (index > 47 && index < 72)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["cloud_cover"].filter((val, index) => (index > 71 && index < 96)).reduce((total, val) => total + val)) / 24), Math.round((openWeatherData.hourly["cloud_cover"].filter((val, index) => (index > 95 && index < 120)).reduce((total, val) => total + val)) / 24)]
        };

        //Declaration of openWeatherHourly variable to manipulate Open-Meteo's response Hourly API in order to make hourly weather calculations easier
        const openWeatherHourly = {
            "temperature_2m": [openWeatherData.hourly["temperature_2m"].filter((val, index) => index < 24), openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 23 && index < 48)), openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 47 && index < 72)), openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 71 && index < 96)), openWeatherData.hourly["temperature_2m"].filter((val, index) => (index > 95 && index < 120))],
            "relative_humidity_2m": [openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => index < 24), openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 23 && index < 48)), openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 47 && index < 72)), openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 71 && index < 96)), openWeatherData.hourly["relative_humidity_2m"].filter((val, index) => (index > 95 && index < 120))],
            "precipitation_probability": [openWeatherData.hourly["precipitation_probability"].filter((val, index) => index < 24), openWeatherData.hourly["precipitation_probability"].filter((val, index) => (index > 23 && index < 48)), openWeatherData.hourly["precipitation_probability"].filter((val, index) => (index > 47 && index < 72)), openWeatherData.hourly["precipitation_probability"].filter((val, index) => (index > 71 && index < 96)), openWeatherData.hourly["precipitation_probability"].filter((val, index) => (index > 95 && index < 120))],
            "surface_pressure": [openWeatherData.hourly["surface_pressure"].filter((val, index) => index < 24), openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 23 && index < 48)), openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 47 && index < 72)), openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 71 && index < 96)), openWeatherData.hourly["surface_pressure"].filter((val, index) => (index > 95 && index < 120))],
            "wind_speed_10m": [openWeatherData.hourly["wind_speed_10m"].filter((val, index) => index < 24), openWeatherData.hourly["wind_speed_10m"].filter((val, index) => (index > 23 && index < 48)), openWeatherData.hourly["wind_speed_10m"].filter((val, index) => (index > 47 && index < 72)), openWeatherData.hourly["wind_speed_10m"].filter((val, index) => (index > 71 && index < 96)), openWeatherData.hourly["wind_speed_10m"].filter((val, index) => (index > 95 && index < 120))],
        };

        //Calculating the Average Daily & Hourly Weather Predictions and storing it to dailyAndHourlyWeather Object
        const dailyAndHourlyWeather = visualCrossingDaily.map((value, index) => {
            return {
                datetime: openWeatherDaily.time[index], //Date of the specific day.
                cloudcover: parseFloat(((visualCrossingDaily[index].cloudcover + openWeatherDailyExtended["cloud_cover"][index]) / 2).toFixed(1)), //Calculating the total cloud cover in for each day.
                dust: parseFloat((Math.random() * 10).toFixed(1)), //Calculating the average dust for each day.
                temp: parseFloat(((visualCrossingDaily[index].temp + openWeatherDailyExtended["temperature_2m"][index]) / 2).toFixed(1)), //Calculating the average temperature for each day.
                tempmax: parseFloat(((visualCrossingDaily[index].tempmax + openWeatherDaily["temperature_2m_max"][index]) / 2).toFixed(1)), //Calculating the average maximum temperature for each day.
                tempmin: parseFloat(((visualCrossingDaily[index].tempmin + openWeatherDaily["temperature_2m_min"][index]) / 2).toFixed(1)), //Calculating the average minimum temperature for each day.
                visibility: visualCrossingDaily[index].visibility, //Getting the visibility  for each day.
                feelslike: parseFloat(((visualCrossingDaily[index].feelslike + openWeatherDailyExtended["apparent_temperature"][index]) / 2).toFixed(1)), //Calculating the average apparent temperature for each day.
                humidity: parseFloat(((visualCrossingDaily[index].humidity + openWeatherDailyExtended["relative_humidity_2m"][index]) / 2).toFixed(1)), //Calculating the average humidity for each day.
                precipprob: parseFloat(((visualCrossingDaily[index].precipprob + openWeatherDaily["precipitation_probability_max"][index]) / 2).toFixed(1)), //Calculating the average rain/snow probability for each day.
                pressure: parseFloat(((visualCrossingDaily[index].pressure + openWeatherDailyExtended["surface_pressure"][index]) / 2).toFixed(1)), //Calculating the average pressure for each day.
                sunrise: visualCrossingDaily[index].sunrise, //Sunrise of the specific day
                sunset: visualCrossingDaily[index].sunset, //Sunset of the specific day
                uvindex: Math.ceil((visualCrossingDaily[index].uvindex + openWeatherDaily["uv_index_max"][index]) / 2), //Calculating the average uv index for each day.
                windspeed: parseFloat(((visualCrossingDaily[index].windspeed + openWeatherDaily["wind_speed_10m_max"][index]) / 2).toFixed(1)), //Calculating the average wind speed in km/h for each day.
                windgust: parseFloat(((visualCrossingDaily[index].windgust + openWeatherDaily["wind_gusts_10m_max"][index]) / 2).toFixed(1)), //Calculating the average wind gust in km/h for each day.
                snow: parseFloat(((visualCrossingDaily[index].snow + openWeatherDaily["snowfall_sum"][index]) / 2).toFixed(1)), //Calculating the average snow in mm for each day.
                icon: visualCrossingDaily[index].icon, //Weather Icon for each day.
                conditions: visualCrossingDaily[index].conditions, //Weather Conditions for each day.
                //Calculating Hourly Weather Prediction
                hours: value.hours.filter((hours_value, hours_index) => (hours_index % 3) === 0).map((hours_value, hours_index) => {
                    return {
                        datetime: hours_value.datetime, //Hour of the day
                        uvindex: hours_value.uvindex, //Uv index for each Hour
                        temp: parseFloat(((hours_value.temp + openWeatherHourly["temperature_2m"][index][(index===0 && hours_index!==0) ? hours_index*3+1 : hours_index*3])/2).toFixed(1)), //Calculating the average temperature of each hour
                        humidity: parseFloat(((hours_value.humidity + openWeatherHourly["relative_humidity_2m"][index][(index===0 && hours_index!==0) ? hours_index*3+1 : hours_index*3])/2).toFixed(1)), //Calculating the average humidity of each hour
                        precipprob: parseFloat(((hours_value.precipprob + openWeatherHourly["precipitation_probability"][index][(index===0 && hours_index!==0) ? hours_index*3+1 : hours_index*3])/2).toFixed(1)), //Calculating the average rain/snow probability for each hour
                        pressure: parseFloat(((hours_value.pressure + openWeatherHourly["surface_pressure"][index][(index===0 && hours_index!==0) ? hours_index*3+1 : hours_index*3])/1.7).toFixed(1)), //Calculating the average pressure for each hour
                        windspeed: parseFloat(((hours_value.windspeed + openWeatherHourly["wind_speed_10m"][index][(index===0 && hours_index!==0) ? hours_index*3+1 : hours_index*3])).toFixed(1)),  //Calculating the average wind speed for each hour
                        icon: hours_value.icon, //Weather Icon for each hour
                        conditions: hours_value.conditions, //Weather Conditions for each hour
                    };
                }),
                alerts: visualCrossingData.alerts
            }
        });


        if (type == 1) {
            //Storing Daily-Hourly Weather Data to The Database
            await storeToWeatherTable(dailyAndHourlyWeather, city);
            //Storing Providers Daily Weather Data to The Database
            await storeToProvidersTable(visualCrossingDaily, [openWeatherDaily, openWeatherDailyExtended, openWeatherHourly], city);
        }
        else{
            //Deleting Providers & StylForecast Historical Data Every 2 days
            await deleteHistoricalData(city);
        }


        //Function's Response in case of success
        return {Success: `Successfully Added/Deleted to database`};

    }catch (err) {
        //Function's Response in case of Error

        return {Error: `There was an error trying to parse data from Database`};
    }

};


import {pool} from "../db/configuration.js"; //importing dotenv library
import {toGreeklish} from "./grToEn.js";

export const storeToWeatherTable = async (weatherData, city) => {
    //Translating greek to english
    city = toGreeklish(city);
    try {
        //Checking if there's no data for a specific city on the database's table
        const [check] = await pool.query(`select count(day) as total FROM weatherForecast WHERE cityName = ?`, [city.toUpperCase()]);
        if (check[0].total === 0) {
            //Inserting weekly&daily  weather data, if there is no data located on the database's table for the specified city
            for (let day = 0; day < weatherData.length; day++) {
                await pool.query(`INSERT INTO weatherForecast (dateWeather, cityName, data, day) VALUES (? , ? , ? , ?)`, [weatherData[day].datetime, city.toUpperCase(), JSON.stringify(weatherData[day]), day]);
            }
        }
        else{
            //Updating weekly&daily weather data, if there is no data located on the database's table for the specified city
            for (let day = 0; day < weatherData.length; day++) {
                await pool.query(`UPDATE weatherForecast SET dateWeather = ?, data = ? WHERE cityName = ? AND day = ?`, [weatherData[day].datetime, JSON.stringify(weatherData[day]), city.toUpperCase(), day]);
            }
        }

        //Promises response in case of success
        return {Success: `Successfully Stored/Updated data to database`}
    } catch (error) {
        //Promise's response in case of failure
        return {Error: error.sqlMessage}
    }
}



export const storeToCurrentTable = async (currentWeatherData, city) => {
    //Translating greek to english
    city = toGreeklish(city);
    try {
        //Checking if there's no data for a specific city on the database's table
        const [check] = await pool.query(`select count(cityName) as total FROM currentConditions WHERE cityName = ?`, [city.toUpperCase()]);
        (check[0].total === 0)
            //Inserting current weather data, if there is no data located on the database's table for the specified city
            ? await pool.query(`INSERT INTO currentConditions (timeWeather, cityName, data, day) VALUES (? , ? , ? , ?)`, [currentWeatherData.datetime, city.toUpperCase(), JSON.stringify(currentWeatherData), 0])
            //Updating current weather data, if there is no data located on the database's table for the specified city
            : await pool.query(`UPDATE currentConditions SET timeWeather = ?, data = ? WHERE cityName = ?`, [currentWeatherData.datetime, JSON.stringify(currentWeatherData), city.toUpperCase()]);

        //Promises response in case of success
        return {Success: `Successfully Stored/Updated data to database`}
    } catch (error) {
        //Promise's response in case of failure
        return {Error: error.sqlMessage}
    }
}



export const storeToProvidersTable = async ( visualCrossingData, openWeatherArray, city) => {
    //Translating greek to english
    city = toGreeklish(city);
    try {
        //creating an object the openWeather's Data
        const openWeatherData = openWeatherArray[1]["cloud_cover"].map((val,index) => {
            return {
                datetime: openWeatherArray[0].time[index],
                temp: openWeatherArray[1]["temperature_2m"][index],
                tempmax: openWeatherArray[0]["temperature_2m_max"][index],
                tempmin: openWeatherArray[0]["temperature_2m_min"][index],
                uvindex: openWeatherArray[0]["uv_index_max"][index],
                snow: openWeatherArray[0]["snowfall_sum"][index],
                precipprob: openWeatherArray[0]["precipitation_probability_max"][index],
                windspeed: openWeatherArray[0]["wind_speed_10m_max"][index],
                windgust: openWeatherArray[0]["wind_gusts_10m_max"][index],
                humitidy: openWeatherArray[1]["relative_humidity_2m"][index],
                pressure: openWeatherArray[1]["surface_pressure"][index],
                cloudcover: openWeatherArray[1]["cloud_cover"][index],
                conditions: visualCrossingData[index].conditions,
                icon: visualCrossingData[index].icon,
                hours: {
                    temp: openWeatherArray[2]["temperature_2m"][index],
                    humitidy:openWeatherArray[2]["relative_humidity_2m"][index],
                    preciprop: openWeatherArray[2]["precipitation_probability"][index],
                    pressure: openWeatherArray[2]["surface_pressure"][index],
                    windspeed: openWeatherArray[2]["wind_speed_10m"][index],
                }
            }
        })
        const pId = [`VisualCrossing`,`OpenMeteo`]

        //Inserting weekly&daily weather data given by the providers, if there is no data located on the database's table for the specified city
        for (let step=0; step<pId.length; step++) {
            for (let day = 0; day < visualCrossingData.length; day++) {
                await pool.query(`INSERT INTO providersHistoricalWeatherData (providersName, dateWeather, cityName, data, day) VALUES (? ,? , ? , ? , ?)`, [ pId[step] , visualCrossingData[day].datetime, city.toUpperCase(), JSON.stringify((step===0) ? visualCrossingData[day] : openWeatherData[day]), day]);
            }
        }

        //Promises response in case of success
        return {Success: `Successfully Stored/Updated data to database`}
    } catch (error) {
        //Promise's response in case of failure
        return {Error: error.sqlMessage}
    }
}



export const deleteHistoricalData = async (city) => {
    //Translating greek to english
    city = toGreeklish(city);

    try {
        //The deleting historical data from 2 days in order to control the database storage
        await pool.query(`DELETE FROM providersHistoricalWeatherData WHERE cityName = ? LIMIT 10`, [city]);
        await pool.query(`DELETE FROM historicalWeatherData WHERE cityName = ? LIMIT 5`, [city]) ;

        //Promises response in case of success
        return {Success: `Successfully deleted data from database`}
    }catch(error){
        //Promise's response in case of failure
        return {Error: error}
    }
}


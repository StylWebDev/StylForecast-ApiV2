import {pool} from "../db/configuration.js";
import {toGreeklish} from "./grToEn.js";

//Retrieving Current Weather Forecast from the Database
//Implementing an asynchronous function in order to retrieve data from database
export const getCurrentWeather = async (city) => {
    try{
        const [location] = await pool.query(`SELECT latitude,longitude,resolvedAddress FROM cityList WHERE cityName = ?`, [city.toUpperCase()]);
        const [currentRes] = await pool.query(`SELECT data FROM currentConditions WHERE currentConditions.cityName = ? `, [city.toUpperCase()]);

        //Promises response in case of success
        return  {
            longitude: location[0].longitude, //Location's longitude
            latitude: location[0].latitude, //Location's latitude
            resolvedAddress: location[0].resolvedAddress, //Location's Address
            currentConditions: currentRes[0].data //Current Weather Data
        };
    }catch(err) {
        //Promise's response in case of failure
        return err.sqlMessage;
    }

}

//Retrieving Daily Weather Forecast from the Database
//Implementing an asynchronous function in order to retrieve data from database
export const getDailyWeather = async (city) => {
    try {
        //Selecting information about the location from the Database
        const [location] = await pool.query(`SELECT latitude,longitude,resolvedAddress FROM cityList WHERE cityName = ?`, [city.toUpperCase()]);
        //Selecting Current Weather Forecast from the Database
        const [currentRes] = await pool.query(`SELECT data FROM currentConditions WHERE currentConditions.cityName = ? `, [city.toUpperCase()]);
        //Selecting Daily Weather Forecast from the Database
        const [dailyRes] = await pool.query(`SELECT data FROM weatherForecast WHERE cityName = ? `, [city.toUpperCase()]);

        //Promises response in case of success
        return {
            longitude: location[0].longitude, //Location's longitude
            latitude: location[0].latitude, //Location's latitude
            resolvedAddress: location[0].resolvedAddress, //Location's Address
            currentConditions: currentRes[0].data, //Current Weather Data
            //Daily Weather Data
            days: dailyRes.map(val => {
                return {data: val.data}
            })
        };
    }catch(err) {
        //Promise's response in case of failure
        return err.sqlMessage;
    }
}

//Retrieving Weekly Weather Forecast from the Database
//Implementing an asynchronous function in order to retrieve data from database
export const getWeeklyWeather = async (city) => {
    try {
        //Selecting information about the location from the Database
        const [location] = await pool.query(`SELECT latitude,longitude,resolvedAddress FROM cityList WHERE cityName = ?`, [city.toUpperCase()]);
        //Selecting Weekly Weather Forecast from the Database
        const [weeklyRes] = await pool.query(`SELECT data FROM weatherForecast WHERE cityName = ? `, [city.toUpperCase()]);
        //Selecting Current Weather Forecast from the Database
        const [currentRes] = await pool.query(`SELECT data FROM currentConditions WHERE currentConditions.cityName = ? `, [city.toUpperCase()]);

        //Promises response in case of success
        return {
            longitude: location[0].longitude, //Location's longitude
            latitude: location[0].latitude, //Location's latitude
            resolvedAddress: location[0].resolvedAddress, //Location's Address
            currentConditions: currentRes[0].data, //Current Weather Data
            days: weeklyRes.map(val => {delete val.data.hours; return {data: val.data }}), //Weekly Weather Data
        };
    }catch(err) {
        //Promise's response in case of failure
        return err.sqlMessage;
    }

}

//Retrieving Historical Weather Data from the Database
//Implementing an asynchronous function in order to retrieve data from database
export const getHistoricalWeatherData = async (city, date) => {
    try {
        //Selecting information about the location from the Database
        const [location] = await pool.query(`SELECT latitude,longitude,resolvedAddress FROM cityList WHERE cityName = ?`, [city.toUpperCase()]);
        //Selecting Historical Weather Data from the Database
        const [historicalWeather] = await pool.query(`SELECT dateWeather,data FROM historicalWeatherData weatherForecast WHERE cityName = ? && dateWeather = ?`, [city.toUpperCase(), date]);

        //Promises response in case of success
        return {
            longitude: location[0].longitude, //Location's longitude
            latitude: location[0].latitude, //Location's latitude
            resolvedAddress: location[0].resolvedAddress, //Location's Address
            datetime : date, //datetime
            days: historicalWeather[historicalWeather.length - 1].data, //Historical  Weather Data
        };
    }catch(err) {
        //Promise's response in case of failure
        return err.sqlMessage;
    }
}

//Retrieving Provider's Historical Weather Data from the Database
//Implementing an asynchronous function in order to retrieve data from database
export const getProvidersHistoricalWeatherData = async (city, date, provider) => {
    try {
        //Selecting information about the location from the Database
        const [location] = await pool.query(`SELECT latitude,longitude,resolvedAddress FROM cityList WHERE cityName = ?`, [city.toUpperCase()]);
        //Selecting Provider's Historical Weather Data from the Database
        const [historicalWeather] = await pool.query(`SELECT providersName,data FROM providersHistoricalWeatherData WHERE cityName = ? && dateWeather = ? && providersName = ?`, [city.toUpperCase(), date, provider]);

        //Promises response in case of success
        return {
            longitude: location[0].longitude, //Location's longitude
            latitude: location[0].latitude, //Location's latitude
            resolvedAddress: location[0].resolvedAddress, //Location's Address
            datetime : date, //datetime
            provider: historicalWeather[0].providersName, //Provider's Domain name
            days: historicalWeather[0].data, //Historical Weather Data from the Providers
        };
    }catch(err) {
        //Promise's response in case of failure
        return err.sqlMessage;
    }

}

//Retrieving Provider's Weekly Weather Forecast from the Database
//Implementing an asynchronous function in order to retrieve data from database
export const getProvidersDailyWeatherData = async (city) => {
    try {
        //Selecting information about the location from the Database
        const [location] = await pool.query(`SELECT latitude,longitude,resolvedAddress FROM cityList WHERE cityName = ?`, [city.toUpperCase()]);
        //Selecting visualCrossing's Weekly Weather Forecast from the Database
        const [visualCrossing] = await pool.query(`SELECT providersName,data FROM providersWeatherForecast weatherForecast WHERE cityName = ? && providersName = ? `, [city.toUpperCase(), `VisualCrossing`]);
        //Selecting OpenWeather's Weekly Weather Forecast from the Database
        const [openWeather] = await pool.query(`SELECT providersName,data FROM providersWeatherForecast weatherForecast WHERE cityName = ? && providersName = ?`, [city.toUpperCase(), `OpenMeteo`]);


        //Promises response in case of success
        return {
            longitude: location[0].longitude, //Location's longitude
            latitude: location[0].latitude, //Location's latitude
            resolvedAddress: location[0].resolvedAddress, //Location's Address
            visualCrossingData: {
                providersName: visualCrossing[0].providersName, //visualCrossing's Domain name
                days: visualCrossing.map(val => {delete val.data.hours; return {data: val.data}}).reverse() //visualCrossing's Weekly Forecast
            },
            openWeatherData: {
                providersName: openWeather[0].providersName, //OpenWeather's  Domain name
                days: openWeather.map(val => {delete val.data.hours; return {data: val.data}}).reverse() //OpenWeather's  Weekly Forecast
            }
        };
    }catch(err) {
        //Promise's response in case of failure
        return err.sqlMessage;
    }

}
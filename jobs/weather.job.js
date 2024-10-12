import Weather from '../models/weather.model.js'
import cityList from "../database/cities.js";
import job from 'node-cron';



//Scheduling a job to update the current weather data per hour for every city, to the database
export const currentWeatherJob = () => {
    job.schedule("30 */1 * * *", async () => {
        for (let city = 0; city < cityList.length; city++) {
            Weather.currentWeather(cityList[city])//Updating current weather data
                .then((data) => {console.log(data)})
                .catch(e => {
                    throw new Error(`Error while storing Current Weather Data: ${e}`)
                }) //Job's log in case of failure
        }
    });
}

//Scheduling a job to store or update weather data (historical or not) every day on 12:30 AM for every city, to the database
export const storeWeatherDataJob = () => {
    job.schedule(("20 30 0 * * *"), async () => {
            for (let city = 0; city < cityList.length; city++) {
                Weather.dailyWeatherData(cityList[city], 1)//Storing/Updating weather data
                    .then((data) => {console.log(data)}) //Job's log in case of success)
                    .catch(e => {
                        throw new Error(`${e}`)
                    }) //Job's log in case of failure
                }
            }, {
        scheduled: true, //Enable auto-scheduling
    });
}
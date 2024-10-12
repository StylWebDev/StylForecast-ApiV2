import {storeCurrentWeather} from "../functions/storeCurrentWeather.js";
import {storeWeatherData} from "../functions/storeWeatherData.js";
import {cityList} from "../dbFunctions/dbCitylist.js";
import job from 'node-cron';

//Scheduling a job to update the current weather data per hour for every city, to the database
export const currentWeatherJob = () => {
    job.schedule("30 */1 * * *", async () => {
            for (let city = 0; city < cityList.length; city++)
                storeCurrentWeather(cityList[city]) //Updating current weather data
                    .then(() => {console.log(`Successfully Stored Current Weather Predictions For All Cities! ${new Date().toLocaleDateString('el-GR')}`);}) //Job's log in case of success
                    .catch(e => {throw new Error(`Error while storing Current Weather Data: ${e}`)}) //Job's log in case of failure
    });
}

//Scheduling a job to store or update weather data (historical or not) every day on 12:30 AM for every city, to the database
export const storeWeatherDataJob = () => {
    job.schedule(("20 30 0 * * *"), async () => {
            for (let city = 0; city < cityList.length; city++)
                storeWeatherData(cityList[city], 1) //Storing/Updating weather data
                .then(() => {console.log(`Successfully Stored Daily Weather Predictions For All Cities! ${new Date().toLocaleDateString('el-GR')}`);}) //Job's log in case of success
                .catch(e => {throw new Error(`Error while storing Weather: ${e}`)}) //Job's log in case of failure
    }, {
        scheduled: true, //Enable auto-scheduling
    });
}
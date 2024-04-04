import express from 'express'; //Importing express dependency
import cors from 'cors'; //Importing cors dependency
import helmet from 'helmet'; //Importing helmet dependency
import dotenv from 'dotenv'; //Importing dotenv dependency
import morgan from 'morgan'; //Importing morgan dependency
import { dirname } from 'node:path'; //Importing directory name from node path
import { fileURLToPath } from 'node:url'; //Importing directory name from node url
import job from 'node-cron';
import * as path from "path"; // Import path from node path
import {cityList} from "./dbFunctions/dbCitylist.js";

const __dirname = dirname(fileURLToPath(import.meta.url)); //Declaring current directory name


//Importing weather functions
import {
    getCurrentWeather,
    getProvidersDailyWeatherData,
    getWeeklyWeather,
    getDailyWeather,
    getHistoricalWeatherData,
    getProvidersHistoricalWeatherData
} from "./dbFunctions/retrievingDataFromDatabase.js";


import {storeCurrentWeather} from "./functions/storeCurrentWeather.js";
import {deleteHistoricalData} from "./dbFunctions/storingDataToDatabase.js";
import {storeWeatherData} from "./functions/storeWeatherData.js";

const app = express(); //Creating express server
dotenv.config(); // Accessing environment variables

app.use(express.json()); //Telling the Web server that our web service is a json service
app.use(cors()); //help me to manage and control any cross-origin requests
app.use(morgan("combined")); //A tool which logs successes and errors
app.use(helmet()); //Secures HTTP response headers
app.disable("x-powered-by"); //Hiding express Server information

//Scheduling a job to update the current weather data per hour for every city, to the database
job.schedule("0 */1 * * *", async () => {
    try{
        for (let city=0; city<cityList.length; city++) {
            await storeCurrentWeather(cityList[city]); //Updating current weather data
        }

        //Job's log in case of success
        console.log(`Successfully Stored Current Weather Predictions For All Cities! ${new Date().toLocaleDateString('el-GR')}`);
    }catch(e){
        //Job's log in case of failure
        console.log(`Error while storing Current Weather Data: ${e}`);
    }
})

//Scheduling a job to store or update weather data (historical or not) every day on 12:30 AM for every city, to the database
job.schedule(("20 30 0 * * *"), async () => {
    try{
        for (let city=0; city<cityList.length; city++) {
            await storeWeatherData(cityList[city],1); //Storing/Updating weather data
            }

        //Job's log in case of success
        console.log(`Successfully Stored Daily Weather Predictions For All Cities! ${new Date().toLocaleDateString('el-GR')}`);
    }catch(e){
        //Job's log in case of failure
        console.error(`Error while storing Weather: ${e}`);
    }
}, {
    scheduled: true, //Enable auto-scheduling
    timezone: "Europe/Athens", //Setting timezone
})

//Scheduling a job delete historical weather data per two days for every city, from the database
job.schedule("0 23 */2 * *", async () => {
    try{
        for (let city=0; city<cityList.length; city++) {
            await deleteHistoricalData(cityList[city]); //Deleting historical weather data
        }

        //Job's log in case of failure
        console.log(`Successfully Deleted Historical Weather Data For All Cities! ${new Date().toLocaleDateString('el-GR')}`);
    }catch(e){
        //Job's log in case of failure
        console.error(`Error while Deleting Weather: ${e}`);
    }
}, {
    scheduled: true, //Enable auto-scheduling
    timezone: "Europe/Athens", //Setting timezone
})


//Creating the main route of our application
app.get("/", (req, res) => {
    res.status(201).sendFile(path.join(__dirname, 'index.html'));
})

//Creating route for current forecast
app.get("/weather/current/:city", async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather = await getCurrentWeather(req.params.city); //Retrieving current weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating route for weekly forecast
app.get("/weather/weekly/:city", async (req,res) => {
    //Catching Possible fetching errors
    try{
        const weather = await getWeeklyWeather(req.params.city); //Getting weekly weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }

})

//Creating route for Daily forecast
app.get("/weather/daily/:city", async (req,res) => {
    //Catching Possible fetching errors
   try{
        const weather =  await getDailyWeather(req.params.city); //Retrieving daily weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
});

//Creating route for VisualCrossing and Open-Meteo weatherData
app.get("/weather/default/:city", async (req,res) => {
    try{
        const weather =  await getProvidersDailyWeatherData(req.params.city); //Retrieving provider's weather data
        res.status(201).json(weather); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating path for historical weather data
app.get("/weather/historical/:city", async (req,res) => {
    try{
        const data =  await getHistoricalWeatherData(req.params.city, req.query.date); //Retrieving historical weather data for a specific Date
        res.status(201).json(data); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating path for providers historical weather data
app.get("/weather/historical/:city/:provider", async (req,res) => {
    try{
        const data =  await getProvidersHistoricalWeatherData(req.params.city, req.query.date , req.params.provider); //Retrieving historical weather data for a specific provider and day
        res.status(201).json(data); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating a spinUp path to create an uptime for the server
app.get("/spinUp", (req,res) => {
    try{
        res.status(201).json({Response: `Successfully responded ${new Date().toLocaleDateString('el_GR')}`}); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating a 404 response for unused routes
app.get("/*", (req, res) => {
    res.status(404).send("Error 404: Page Not Found");
})

//Creating a 500 page in case if something broke
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Error 500: Internal Server Error!')
})


//Declaring App listener
const listener = app.listen(process.env.APP_PORT || 3000, () => {
    console.log("App is listening on port:" , listener.address().port)
})
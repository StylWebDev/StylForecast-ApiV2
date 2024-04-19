import express from 'express'; //Importing express dependency
import cors from 'cors'; //Importing cors dependency
import helmet from 'helmet'; //Importing helmet dependency
import dotenv from 'dotenv'; //Importing dotenv dependency
import morgan from 'morgan'; //Importing morgan dependency
import { dirname } from 'node:path'; //Importing directory name from node path
import { fileURLToPath } from 'node:url'; //Importing directory name from node url
import job from 'node-cron';
import * as path from "path"; // Import path from node path
import router from "./router/weather.js";
import transRouter from "./router/translations.js";

import {cityList} from "./dbFunctions/dbCitylist.js";

const __dirname = dirname(fileURLToPath(import.meta.url)); //Declaring current directory name

import {storeCurrentWeather} from "./functions/storeCurrentWeather.js";
import {storeWeatherData} from "./functions/storeWeatherData.js";

const app = express(); //Creating express server
dotenv.config(); // Accessing environment variables

app.use(express.json()); //Telling the Web server that our web service is a json service
app.use(cors()); //help me to manage and control any cross-origin requests
app.use(morgan("combined")); //A tool which logs successes and errors
app.use(helmet()); //Secures HTTP response headers
app.disable("x-powered-by"); //Hiding express Server information
app.use("/", router);
app.use("/",transRouter);

//Scheduling a job to update the current weather data per hour for every city, to the database
job.schedule("30 */1 * * *", async () => {
    try{
        for (let city=0; city<cityList.length; city++) await storeCurrentWeather(cityList[city]); //Updating current weather data
        //Job's log in case of success
        console.log(`Successfully Stored Current Weather Predictions For All Cities! ${new Date().toLocaleDateString('el-GR')}`);
    }catch(e){
        //Job's log in case of failure
        console.log(`Error while storing Current Weather Data: ${e}`);
    }
});

//Scheduling a job to store or update weather data (historical or not) every day on 12:30 AM for every city, to the database
job.schedule(("20 30 0 * * *"), async () => {
    try{
        for (let city=0; city<cityList.length; city++) await storeWeatherData(cityList[city],1); //Storing/Updating weather data
        //Job's log in case of success
        console.log(`Successfully Stored Daily Weather Predictions For All Cities! ${new Date().toLocaleDateString('el-GR')}`);
    }catch(e){
        //Job's log in case of failure
        console.error(`Error while storing Weather: ${e}`);
    }
}, {
    scheduled: true, //Enable auto-scheduling
});

//Creating the main route of our application
app.get("/", (req, res) => {
    res.status(201).sendFile(path.join(__dirname, 'index.html'));
});

//Creating a 404 response for unused routes
app.get("/*", (req, res) => {
    res.status(404).send("Error 404: Page Not Found");
});

//Creating a 500 page in case if something broke
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Error 500: Internal Server Error!')
});


//Declaring App listener
const listener = app.listen(process.env.APP_PORT || 3000, () => {
    console.log("App is listening on port:" , listener.address().port)
});
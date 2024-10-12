import express from 'express'; //Importing express dependency
import cors from 'cors'; //Importing cors dependency
import helmet from 'helmet'; //Importing helmet dependency
import dotenv from 'dotenv'; //Importing dotenv dependency
import morgan from 'morgan'; //Importing morgan dependency
import { dirname } from 'node:path'; //Importing directory name from node path
import { fileURLToPath } from 'node:url'; //Importing directory name from node url
import * as path from "path"; // Import path from node path
import weatherRouter from "./routes/weather.js";
import translationRouter from "./routes/translations.js";

import * as Job from "./jobs/weather.job.js"

const __dirname = dirname(fileURLToPath(import.meta.url)); //Declaring current directory name

const app = express(); //Creating express server
dotenv.config(); // Accessing environment variables

app.use(express.json()); //Telling the Web server that our web service is a json service
app.use(cors()); //help me to manage and control any cross-origin requests
app.use(morgan("combined")); //A tool which logs successes and errors
app.use(helmet()); //Secures HTTP response headers
app.disable("x-powered-by"); //Hiding express Server information
app.use("/", weatherRouter);
app.use("/",translationRouter);

Job.currentWeatherJob();
Job.storeWeatherDataJob();

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
import {pool} from "../db/configuration.js";
import dotenv from "dotenv"; //importing dotenv library
dotenv.config(); // Accessing environment variables


//Defining an Array named cityList, which contains a list of the cities that we will provide our weather preictions
export const cityList = [
    'Athens',
    "Agrinio",
    "Aigio",
    "Alexandreia GR",
    "Alexandroupoli",
    "Argos",
    "Veroia",
    "Volos",
    "Giannitsa",
    "Grevena",
    "Drama",
    "Heraklion",
    "Thessaloniki",
    "Thiba GR",
    "Ioannina",
    "Kavala",
    "Karditsa",
    "Kastoria",
    "Katerini",
    "Corfu",
    "Kozani",
    "Komotini",
    "Korinthos",
    "Lamia",
    "Larissa",
    "Nafplio",
    "Ptolemaida",
    "Preveza",
    "Xanthi",
    "Patras",
    "Rethymno",
    "Rhodes",
    "Salamina GR",
    "Serres",
    "Sparta",
    "Trikala",
    "Tripoli GR",
    "Tyrnavos",
    "Florina",
    "Chalkida",
    "Chania",
    "Chalkidiki",
]

//Storing all information we gathered on the database
const storeToCityList = async (city,countryCode) => {
    try {
        //fetching information about the cities from visualCrossing API
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=${process.env.VISUAL_CROSSING_API_DEFAULT}&contentType=json`);
        const data = await response.json() //Retrieving the promises response
        //Inserting cities into the database
        const check = await pool.query(`INSERT INTO cityList (cityName, countryCode, latitude, longitude, resolvedAddress) VALUES (? , ? , ? , ?, ?)`, [city.toUpperCase(), countryCode.toUpperCase(), data.latitude, data.longitude, data.resolvedAddress]);

        //Promises response in case of success
        return {Success: `Successfully Stored data to database`}

    } catch (error) {
        //Promises response in case of Failure
        return {Error: `Couldn't store data to database`}
    }
}

/*try {
    for (let i=0; i<cityList.length; i++){
        await storeToCityList(cityList[i],`GRE`)
    }
    console.log(`Successfully Stored data to database`)
}catch(error) {
    console.log(error)
}*/
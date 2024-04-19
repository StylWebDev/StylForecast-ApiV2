import express from 'express';
const transRouter = express.Router();

//Importing greek and english locales
import en_UK from '../locales/en_UK.json' assert { type: "json" };
import el_GR from '../locales/el_GR.json' assert { type: "json" };

//Creating a spinUp path to create an uptime for the server
transRouter.get("/spinUp", (req,res) => {
    try{
        res.status(201).json({Response: `Successfully responded ${new Date().toLocaleDateString('el_GR')}`}); //Server's Response in case of success
    } catch(err){
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
})

//Creating route for english translations
transRouter.get('/en', (req, res) => {
    //Catching errors
    try {
        res.status(201).json(en_UK) //Getting hourly english translation | Server's Response in case of success
    }catch(err) {
        res.status(501).send(err.message)
    }
})

//Creating route for greek translations
transRouter.get('/el', (req, res) => {
    //Catching errors
    try {
        res.status(201).json(el_GR) //Getting hourly greek translation | Server's Response in case of success
    }catch(err) {
        res.status(501).send(err.message) //Server's Response in case of failure
    }
})

export default transRouter;

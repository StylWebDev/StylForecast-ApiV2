import express from 'express';
const transRouter = express.Router();

//Importing translation controllers
import * as translationController from '../controllers/translation.controller.js'
//Importing SpinUp controller
import spinupController from '../controllers/spinup.controller.js'

//Creating a spinUp path to create an uptime for the server
transRouter.get("/spinUp",spinupController);

//Creating route for english translations
transRouter.get('/en', translationController.getEn)

//Creating route for greek translations
transRouter.get('/el', translationController.getEl)

export default transRouter;

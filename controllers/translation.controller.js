//Importing greek and english locales
import en_UK from '../utils/locales/en_UK.json' assert { type: "json" };
import el_GR from '../utils/locales/el_GR.json' assert { type: "json" };

export const getEn = (req, res) => {
    res.status(201).json(en_UK) //Getting hourly english translation | Server's Response in case of success
}

export const getEl = (req, res) => {
    res.status(201).json(el_GR) //Getting hourly greek translation | Server's Response in case of success
}

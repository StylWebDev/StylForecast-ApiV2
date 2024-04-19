# ![StylForecastApi_icon](https://api.iconify.design/mdi:server-security.svg?color=%23d96363&width=35) StylForecastAPI V2.1.1:

##### A web service which provides all necessary data to the StylForecast Website

## What information StylForecast Provides? :

- ### Weather Data
  - [x] Weather Forecast for 42 greek cities.
  - [x] 24h Current Weather Conditions.
    -  Current Date.
    -  Current Total Cloud Cover.
    -  Current Dust.
    -  Current Temperature.
    -  Current Presence Temperature.
    -  Fog.
    -  Current UV Index.
    - Current Snow Probability.
    - Current Precipitation Probability.
    - Current Humidity.
    - Current Wind Speed km/h.
    - Current Wind Gusts.
    - Current Surface Pressure.
    - Current Weather Conditions.
    - Weather Conditions Icon.
  - [x] 5-day weather Forecast.
      -  Date.
      -  Total Cloud Cover.
      -  Dust.
      -  Temperature.
      -  Highest Temperature
      -  Lowest Temperature
      -  Presence Temperature.
      -  Fog.
      -  UV Index.
      -  Snow Probability.
      -  Precipitation Probability.
      -  Humidity.
      -  Wind Speed km/h.
      -  Wind Gusts.
      -  Surface Pressure.
      -  Sunrise Time.
      -  Sunset Time.
      -  Wind Direction.
      -  Weather Conditions.
      -  Weather Conditions Icon.
  - [x] Daily weather forecast every 3 hours.
      -  Time.
      -  Temperature.
      -  UV Index.
      -  Humidity.
      -  Wind Speed km/h.
      -  Precipitation Probability.
      -  Surface Pressure.
      -  Weather Conditions.
      -  Weather Conditions Icon.
  - [x] Weather forecast from our weather providers (VisualCrossing Open-Meteo)
    -  Date.
    -  Total Cloud Cover.
    -  Dust.
    -  Temperature.
    -  Highest Temperature
    -  Lowest Temperature
    -  Presence Temperature.
    -  Fog.
    -  UV Index.
    -  Snow Probability.
    -  Precipitation Probability.
    -  Humidity.
    -  Wind Speed km/h.
    -  Wind Gusts.
    -  Surface Pressure.
    -  Sunrise Time.
    -  Sunset Time.
    -  Wind Direction.
    -  Weather Conditions.
    -  Weather Conditions Icon.
    - And More ..
  - [x] Information for all cities:
    - City name
    - Latitude
    - Longitude,
    - Resolved Address
    
- ### Historical Weather Data
  - #### Historical Weather Data for 42 greek cities for a specific date.
      - [x] 5-day weather Forecast.
          -  Date.
          -  Total Cloud Cover.
          -  Dust.
          -  Temperature.
          -  Highest Temperature
          -  Lowest Temperature
          -  Presence Temperature.
          -  Fog.
          -  UV Index.
          -  Snow Probability.
          -  Precipitation Probability.
          -  Humidity.
          -  Wind Speed km/h.
          -  Wind Gusts.
          -  Surface Pressure.
          -  Sunrise Time.
          -  Sunset Time.
          -  Wind Direction.
          -  Weather Conditions.
          -  Weather Conditions Icon.
      - [x] Daily weather forecast every 3 hours.
          -  Time.
          -  Temperature.
          -  UV Index.
          -  Humidity.
          -  Wind Speed km/h.
          -  Precipitation Probability.
          -  Surface Pressure.
          -  Weather Conditions.
          -  Weather Conditions Icon.
  - #### Historical weather data from our weather providers (VisualCrossing & Open-Meteo)
      -  Date.
      -  Total Cloud Cover.
      -  Dust.
      -  Temperature.
      -  Highest Temperature
      -  Lowest Temperature
      -  Presence Temperature.
      -  Fog.
      -  UV Index.
      -  Snow Probability.
      -  Precipitation Probability.
      -  Humidity.
      -  Wind Speed km/h.
      -  Wind Gusts.
      -  Surface Pressure.
      -  Sunrise Time.
      -  Sunset Time.
      -  Wind Direction.
      -  Weather Conditions.
      -  Weather Conditions Icon.
      - And More ..
- ### Translations For StylForecast.
  - [x] Greek Translations (el_GR).
  - [x] English Translations (en_UK).
  - [ ] French Translations (fr_FR).
    - This Section Is Under Construction!
- ### Authedication System.
  - [ ] Admin and Users Authedication.
    - This Section Is Under Construction!

## Weather Data Providers:
 - ### Visual Crossing
   -  https://open-meteo.com
 - ### Open Meteo 
   - https://open-meteo.com

## Security:
- For security measures all sensitive information was converted into environment variables (aka. they are not accessible).
- Use of Helmet js.
- Disabled x-powered-by to hide HTTP information.
- Disabled Ping Requests.

## License
- **MPL 0.2**

## How to use it:
    $ git clone https://github.com/AliBaBas02/StylForecast-ApiV2.git
    $ npm i
    $ npm run dev

## ![tools_img](https://api.iconify.design/mdi:tools.svg?color=%23b9631d&width=20) Tools Used:
This API was created with Express, Javascript ,  Node & MySQL2.

 - ### ![Express_icon](https://api.iconify.design/simple-icons:express.svg?color=%23ffffff&width=20) ExpressJS:
    - https://expressjs.com/
 - ### ![JavaScript_icon](https://api.iconify.design/logos:javascript.svg?width=20)  JavaScript
 - ### ![Node_icon](https://api.iconify.design/logos:nodejs-icon-alt.svg?width=20) NodeJS:
   - https://nodejs.org/en
 - ### ![MySQL_icon](https://api.iconify.design/logos:mysql.svg?width=40) mySQL2:
   - https://sidorares.github.io/node-mysql2/docs/documentation


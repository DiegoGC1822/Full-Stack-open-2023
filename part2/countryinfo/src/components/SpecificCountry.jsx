import { useState,useEffect } from "react"
import axios from "axios"

const SpecificCountry = ({country}) => {

    const apiKey = import.meta.env.VITE_CLIMA_API_KEY
    const [dataWeather, setDataWeather] = useState({})

    useEffect(() => {
        axios
          .get(
            `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}&units=f`
          )
          .then((response) => {
            const { temperature, weather_icons, wind_speed, wind_dir } = response.data.current
            setDataWeather({
              temperature,
              weather_icons,
              wind_speed,
              wind_dir,
            })
          })
    },[])

    return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>lenguages</h2>
      <ul>
        {Object.values(country.languages).map((country,index) => <li key={index}>{country}</li>)}
      </ul>
        <img src={country.flags.png} alt="flag"/>
      <div>
        <h3>Weather in {country.capital}</h3>
        <p><b>temperature</b> {Math.round((dataWeather.temperature-32)/1.8)} Celcius</p>
        <img src={dataWeather.weather_icons} alt="weather" />
        <p><b>wind</b> {dataWeather.wind_speed} mph direction {dataWeather.wind_dir}</p>
      </div>        
    </div>
    )
}

export default SpecificCountry
import axios from "axios";
import { Fragment, useState, useEffect } from "react";

function App() {

  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])

  if(location === false){
    return (
    <Fragment>
      Voce Precisa habilitar a localizacao no navegador!
    </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima
      </Fragment>
    )
    } else {
    return (
      <Fragment>
        <h3>Clima em suas coordenadas ({weather['weather'][0]['description']})</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°C</li>
          <li>Temperatura maxima: {weather['main']['temp_max']}°C</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°C</li>
          <li>Pressao: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './Weather';

export type WeatherApiReponse = {
  main: any
  name: string
  sys: {
    sunrise: number
    sunset: number
  }
  weather: [{
    description: string
  }]
  humidity: number
}

const buildUrl = (lat: number, lon: number, units: 'metric' | 'imperial' = 'imperial') =>
  `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=${units}&APPID=${process.env.REACT_APP_API_KEY}`

function App() {
  const [lat, setLat] = useState<number>()
  const [lon, setLon] = useState<number>()
  const [data, setData] = useState<WeatherApiReponse>()
  const [error, setError] = useState<string>()

  const fetchData = async (lat: number, lon: number) => {
    const fetchResult = await fetch(buildUrl(lat, lon))
    return await fetchResult.json()
  }

  // effect to get latitude and longitude
  useEffect(() => {
    // if latitude and longitude have been set already, we don't need to do this
    if (lat && lon) return

    setError(undefined)

    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    })
  }, [lat, lon])

  useEffect(() => {
    // if any of the following are true, do not do anything:
    //  1. latitude is null - pointless fetch
    //  2. longitude is null - pointless fetch
    //  3. data is already populated - this will prevent needless requests from going out
    if (!lat || !lon || data) return

    fetchData(lat, lon)
      .then(data => setData(data))
      .catch(error => setError(error.message))
  }, [lat, lon, data, error])

  return (
    <div className="App">
      {error && `An Error Occurred: ${error}`}
      {data?.main && <Weather data={data} />}
    </div>
  );
}

export default App;

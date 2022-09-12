import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [lat, setLat] = useState<number>()
  const [lon, setLon] = useState<number>()
  const [data, setData] = useState<object>()

  const fetchData = async (lat: number, lon: number) => {
    const fetchResult = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    const jsonResult = await fetchResult.json()
    console.log(jsonResult)
    setData(jsonResult)
  }

  // effect to get latitude and longitude
  useEffect(() => {
    // if latitude and longitude have been set already, we don't need to do this
    if (lat && lon) return

    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    })

    console.log(`Latitude is: ${lat}`)
    console.log(`Longitude is: ${lon}`)
  }, [lat, lon])

  useEffect(() => {
    // if any of the following are true, do not do anything:
    //  1. latitude is null - pointless fetch
    //  2. longitude is null - pointless fetch
    //  3. data is already populated - this will prevent needless requests from going out
    if (!lat || !lon || data) return
    fetchData(lat, lon)
  }, [lat, lon])

  return (
    <div className="App">

    </div>
  );
}

export default App;

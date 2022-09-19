import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'semantic-ui-react'
import { WeatherApiReponse } from './App'

type WeatherProps = {
  data: WeatherApiReponse
  refresh: () => void
}

const Weather = ({ data, refresh }: WeatherProps) => (
  <div className="main">
    <div className="top">
      <p className="header">{data.name}</p>
      <Button className="button" inverted color="blue" circular icon={<FontAwesomeIcon icon={faRefresh} size="xl" />} onClick={refresh} />
    </div>

    <div className="flex">
      <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
      <p className="description">{data.weather[0].main}</p>
    </div>

    <div className="flex">
      <p className="temp">Temperature: {data.main.temp} &deg;F</p>
      <p className="temp">Humidify: {data.main.humidity} %</p>
    </div>

    <div className="flex">
      <p className="sunrise-sunset">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US')}</p>
      <p className="sunrise-sunset">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US')}</p>
    </div>
  </div>
)

export default Weather

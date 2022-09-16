import moment from 'moment'
import { Card } from 'semantic-ui-react'
import { WeatherApiReponse } from './App'

type WeatherProps = {
  data: WeatherApiReponse
}

const Weather = ({ data }: WeatherProps) => (
  <Card>
    <Card.Content>
      <Card.Header className="header">
        City Name: {data.name}
      </Card.Header>
      <p>Temperature: {data.main.temp}</p>
      <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US')}</p>
      <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US')}</p>
      <p>Description: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity} %</p>
      <p>Day: {moment().format('dddd')}</p>
      <p>Date: {moment().format('LL')}</p>
    </Card.Content>
  </Card>
)

export default Weather

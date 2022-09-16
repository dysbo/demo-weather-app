import { Card } from 'semantic-ui-react'
import { WeatherApiReponse } from "./App"

type WeatherProps = {
    data: WeatherApiReponse
}

const Weather = ({ data }: WeatherProps) => (
    <Card>
        <Card.Content>
            <Card.Header className='header'>
                {data.name}
            </Card.Header>
        </Card.Content>
    </Card>
)

export default Weather

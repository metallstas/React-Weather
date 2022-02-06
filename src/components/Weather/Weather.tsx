import { useEffect, useState } from 'react'
import { InputCity } from './InputCity/InputCity'
import cls from './Weather.module.css'

interface IWeather {
  message: string
  cod: number | string
  id: number
  main: {
    humidity: number
    temp: number
  }
  name: string
  sys: {
    type: number
    id: number
    country: string
  }
  weather: [{ id: number; main: string; description: string }]
  wind: { speed: number; deg: number; gust: number }
}

export const Weather = () => {
  const [weather, setWeater] = useState<IWeather>()
  const [celcii, setCelcii] = useState(true)

  const getWeather = async (city = 'Minsk') => {
    const respWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=66537799e2af866eeee53d276ac3fcc1`
    )
    const dataWeather = await respWeather.json()
    console.log(dataWeather)
    setWeater(dataWeather)
  }

  useEffect(() => {
    getWeather()
  }, [])

  const date = new Date()

  const dayOfWeek = (date: number) => {
    const day = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ]
    return day[date]
  }

  const converteToFaringate = (tempCelcii: number) => {
    return ((tempCelcii * 9) / 5 + 32).toFixed(0)
  }

  const handlerFaringate = () => {
    setCelcii(false)
  }

  const handlerCelsii = () => {
    setCelcii(true)
  }

  const showWeather = () => {
    if (weather?.cod !== 200) {
      return <p>{weather?.message}</p>
    }
    return (
      <div>
        <p className={cls.nameCity}>
          {weather?.name}, {weather?.sys.country}
        </p>
        <div className={cls.weatherDetails}>
          <div className={cls.tempWrap}>
            <p className={cls.temp}>
              {celcii
                ? weather.main.temp.toFixed(0)
                : converteToFaringate(weather.main.temp)}
              <small>{celcii ? '°C' : '°F'}</small>
            </p>
            <div className={cls.units}>
              <span onClick={handlerFaringate}>°F</span>
              <span onClick={handlerCelsii}>°C</span>
            </div>
          </div>
          <div>
            <div className={cls.date}>
              <span>{dayOfWeek(date.getDate())}, </span>
              <span>{date.toLocaleTimeString()}</span>
              <p>{weather?.weather[0].description}</p>
            </div>
            <div className={cls.date}>
              <p>Скорость ветра: {weather?.wind.speed} м/с</p>
              <p>Влажность: {weather?.main.humidity} %</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cls.weather}>
      <InputCity cityName={getWeather} />
      {showWeather()}
    </div>
  )
}

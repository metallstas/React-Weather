import React, { useState } from 'react'
import cls from './InputCity.module.css'

interface IInputCity {
  cityName: (cityName: string) => void
}

export const InputCity = ({ cityName }: IInputCity) => {
  const [city, setCity] = useState<string>('')
  const [checkCity, setCheckCity] = useState(false)

  const sendByKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlerCity()
    }
  }

  const handlerCity = () => {
    if (!city) {
      setCheckCity(true)
    } else {
      setCheckCity(false)
    }
    cityName(city)
    setCity('')
  }

  return (
    <div className={cls.form}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => sendByKeyboard(e)}
      />
      <button onClick={handlerCity}>Поиск</button>
      {checkCity ? <p>Введите название города</p> : null}
    </div>
  )
}

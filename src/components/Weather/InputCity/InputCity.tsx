import React, { useState } from 'react'
import cls from './InputCity.module.css'

interface IInputCity {
  onChangeCityName: (cityName: string) => void
}

export const InputCity = ({ onChangeCityName }: IInputCity) => {
  const [city, setCity] = useState<string>('')
  const [checkCity, setCheckCity] = useState(false)

  const sendByKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChangeCity()
    }
  }

  const handleChangeCity = () => {
    if (!city) {
      setCheckCity(true)
    } else {
      setCheckCity(false)
    }
    onChangeCityName(city)
    setCity('')
  }

  return (
    <div className={cls.form}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => sendByKeyboard(e)}
      />
      <button onClick={handleChangeCity}>Поиск</button>
      {checkCity ? <p>Введите название города</p> : null}
    </div>
  )
}

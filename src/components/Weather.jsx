import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import Button from '@mui/material/Button';

function Weather() {

    const defaultCity = 'Ялта';
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(defaultCity);
    const [error, setError] = useState(null);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const getWeather = () => {
        if (!city) return;

        const myAppkeyFromSite = 'cd7d02462b5bcac40755e1433681148a';
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAppkeyFromSite}`;

        axios.get(apiUrl)
            .then((response) => {
                setWeatherData(response.data);
                setError(null);
            })
            .catch((err) => {
                setError('Город не найден');
                setWeatherData(null);
            });
    };

    useEffect(() => {
        getWeather();
    }, []);

    return ( 
        <div className='weather-container'>
            <input 
                type='text'
                placeholder='Введите город'
                value={city}
                onChange={handleCityChange}    
            />
            <Button variant="text" onClick={getWeather}>Отобразить погоду</Button>

            {error && <div className='error'>{error}</div>}
            {weatherData && (
                <div className='weather-info'>
                    <h3>{weatherData.name}</h3>
                    <p>Температура: {Math.round(weatherData.main.temp - 273.15)} C</p>
                    <p>Влажность: {weatherData.main.humidity} %</p>
                    <p>Давление: {weatherData.main.pressure} hPa</p>
                    <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
                    <p>Описание: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
     );
}

export default Weather;
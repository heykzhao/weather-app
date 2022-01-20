/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// Import styles
import './styles/Reset.css';
import './styles/App.css';

// Import components
import Loading from './components/Loading';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather';
import DailyWeather from './components/DailyWeather';
import Footer from './components/Footer';

// Import functions
import returnCoordinates from './functions/getCurrentLocation';
import { getCityCoordinates, getCurrentCoordinatesWeather } from './functions/getWeather';
import getCityNameByCoordinates from './functions/getCityName';
import emptyWeatherArray from './functions/emptyWeatherArray.json';

export default function App() {
  const [weather, setWeather] = useState(emptyWeatherArray);
  const [units, setUnits] = useState('imperial');
  const [city, setCity] = useState('');

  async function getWeatherAtCurrentLocation() {
    try {
      const currentCoordinates = await returnCoordinates();
      const currentCityName = await getCityNameByCoordinates(
        currentCoordinates.lat,
        currentCoordinates.lon,
      );
      setCity(currentCityName);
      setWeather(await getCurrentCoordinatesWeather(
        currentCoordinates.lat,
        currentCoordinates.lon,
        units,
      ));
    } catch (error) {
      console.warn(error);
    }
  }

  useState(() => getWeatherAtCurrentLocation(), []);

  return (
    <div className="app-container">
      {weather === emptyWeatherArray
        ? (
          <div className="data-loading">
            <Header />
            <Loading />
          </div>
        )
        : (
          <div className="data-loaded">
            <div className="header-current">
              <Header />
              <CurrentWeather
                item={weather.currentWeather}
                city={city}
              />
            </div>
            <HourlyWeather />
            <DailyWeather />
          </div>
        )}
      <Footer />
    </div>
  );
}

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

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
import emptyWeatherArray from './functions/emptyWeatherArray.json';

export default function App() {
  const [weather, setWeather] = useState(emptyWeatherArray);
  const [units, setUnits] = useState('imperial');

  async function getWeatherAtCurrentLocation() {
    try {
      const currentCoordinates = await returnCoordinates();
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
      {weather === emptyWeatherArray ? <Loading /> : ''}
      <Header />
      <CurrentWeather
        item={weather.currentWeather}
      />
      <HourlyWeather />
      <DailyWeather />
      <Footer />
    </div>
  );
}

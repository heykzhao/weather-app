/* eslint-disable react/jsx-no-bind */
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
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [units, setUnit] = useState('imperial');
  const [loading, setLoading] = useState(true);

  async function getCurrentLocationWeather() {
    try {
      setLoading(true);
      const currentCoordinates = await returnCoordinates();
      const currentCityName = await getCityNameByCoordinates(
        currentCoordinates.lat,
        currentCoordinates.lon,
      );
      const retreiveWeather = await getCurrentCoordinatesWeather(
        currentCoordinates.lat,
        currentCoordinates.lon,
        units,
      );
      setWeather(retreiveWeather);
      setCoordinates({
        lat: currentCoordinates.lat,
        lon: currentCoordinates.lon,
      });
      setCity(currentCityName);
      setLoading(false);
    } catch {
      const currentCoordinates = await getCityCoordinates('Chicago');
      const retreiveWeather = await getCurrentCoordinatesWeather(
        currentCoordinates.lat,
        currentCoordinates.lon,
        units,
      );
      setWeather(retreiveWeather);
      setCoordinates({
        lat: currentCoordinates.lat,
        lon: currentCoordinates.lon,
      });
      setCity('Chicago, Illinois US');
      setLoading(false);
    }
  }
  useState(() => getCurrentLocationWeather(), []);

  async function changeUnits(e) {
    try {
      console.log(e.target.name);
      const buttonName = e.target.name;
      let selectedUnit = '';
      if (buttonName === 'celsius') {
        setLoading(true);
        setUnit('metric');
        selectedUnit = 'metric';
        const retreiveNewUnitsWeather = await getCurrentCoordinatesWeather(
          coordinates.lat,
          coordinates.lon,
          selectedUnit,
        );
        setWeather(retreiveNewUnitsWeather);
        setLoading(false);
      } else if (buttonName === 'fahrenheit') {
        setLoading(true);
        setUnit('imperial');
        selectedUnit = 'imperial';
        const retreiveNewUnitsWeather = await getCurrentCoordinatesWeather(
          coordinates.lat,
          coordinates.lon,
          selectedUnit,
        );
        setLoading(false);
        setWeather(retreiveNewUnitsWeather);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app-container">
      {loading === true
        ? (
          <div className="data-loading">
            <Header />
            <Loading />
          </div>
        )
        : (
          <div className="data-loaded">
            <div className="header-current">
              <Header
                getCurrentLocationWeather={getCurrentLocationWeather}
                changeUnits={changeUnits}
              />
              <CurrentWeather
                item={weather.currentWeather}
                city={city}
                units={units}
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

/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// Import styles
import './styles/Reset.css';
import './styles/App.css';

// Import components
import Loading from './components/Loading';
import Error from './components/Error';
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
  const [errorLoading, setErrorLoading] = useState(false);
  const [currentLocationError, setCurrentLocationError] = useState(false);
  const [noLocationFoundError, setNoLocationFoundError] = useState(false);

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
      setCurrentLocationError(false);
      setCoordinates({
        lat: currentCoordinates.lat,
        lon: currentCoordinates.lon,
      });
      setCity(currentCityName);
      setLoading(false);
    } catch {
      setErrorLoading(true);
      setCurrentLocationError(true);
      setLoading(false);
    }
  }
  useEffect(() => getCurrentLocationWeather(), []);

  async function changeUnits(e) {
    try {
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
      setErrorLoading(true);
      setLoading(false);
    }
  }

  function LoadHandling({ loadingStatus, errorLoadingStatus }) {
    if (loadingStatus === true) {
      return (
        <div className="data-loading">
          <Header />
          <div className="loading-spinner">
            <Loading />
          </div>
          <Footer />
        </div>
      );
    }
    if (loadingStatus === false && errorLoadingStatus === false) {
      return (
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
          <div className="non-current">
            <HourlyWeather />
            <DailyWeather />
          </div>
          <Footer />
        </div>
      );
    }
    if (loadingStatus === false && errorLoadingStatus === true) {
      return (
        <div className="error-loading">
          <Header />
          <div className="error-message">
            <Error
              currentLocationErrorStatus={currentLocationError}
              // noLocationFoundErroStatusr={}
            />
          </div>
          <Footer />
        </div>
      );
    }
  }

  return (
    <div className="app-container">
      <LoadHandling
        loadingStatus={loading}
        errorLoadingStatus={errorLoading}
      />
    </div>
  );
}

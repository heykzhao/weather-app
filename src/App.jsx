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
  const [allData, setAllData] = useState({
    weather: emptyWeatherArray,
    city: '',
    coordinates: { lat: '', lon: '' },
    units: 'imperial',
    searchQuery: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    errorLoading: false,
    currentLocationError: false,
    noLocationFoundError: false,
    unitsError: false,
  });

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
        allData.units,
      );
      setAllData((prevValue) => ({
        ...prevValue,
        weather: retreiveWeather,
        city: currentCityName,
        coordinates: { lat: currentCoordinates.lat, lon: currentCoordinates.lon },
      }));
      setErrorStatus((prevValue) => ({
        ...prevValue,
        errorLoading: false,
        currentLocationError: false,
        noLocationFoundError: false,
        unitsError: false,
      }));
      setLoading(false);
    } catch {
      setLoading(true);
      setErrorStatus((prevValue) => ({
        ...prevValue,
        errorLoading: true,
        currentLocationError: false,
        noLocationFoundError: false,
        unitsError: false,
      }));
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
        selectedUnit = 'metric';
        const retreiveNewUnitsWeather = await getCurrentCoordinatesWeather(
          allData.coordinates.lat,
          allData.coordinates.lon,
          selectedUnit,
        );
        setAllData((prevValue) => ({
          ...prevValue,
          weather: retreiveNewUnitsWeather,
          units: 'metric',
        }));
        setLoading(false);
      } else if (buttonName === 'fahrenheit') {
        setLoading(true);
        selectedUnit = 'imperial';
        const retreiveNewUnitsWeather = await getCurrentCoordinatesWeather(
          allData.coordinates.lat,
          allData.coordinates.lon,
          selectedUnit,
        );
        setAllData((prevValue) => ({
          ...prevValue,
          weather: retreiveNewUnitsWeather,
          units: 'imperial',
        }));
        setLoading(false);
      }
    } catch (error) {
      setErrorStatus((prevValue) => ({
        ...prevValue,
        errorLoading: true,
        currentLocationError: false,
        noLocationFoundError: false,
        unitsError: true,
      }));
      setLoading(false);
    }
  }

  function handleChange(e) {
    setAllData((prevValue) => ({
      ...prevValue,
      searchQuery: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(allData.searchQuery);
    setAllData((prevValue) => ({
      ...prevValue,
      searchQuery: '',
    }));
  }

  function LoadHandling({ loadingStatus, errorLoadingStatus }) {
    if (loadingStatus === true) {
      return (
        <div className="data-loading">
          <Header
            getCurrentLocationWeather={getCurrentLocationWeather}
            changeUnits={changeUnits}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            searchQuery={allData.searchQuery}
          />
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
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              searchQuery={allData.searchQuery}
            />
            <CurrentWeather
              item={allData.weather.currentWeather}
              city={allData.city}
              units={allData.units}
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
          <Header
            getCurrentLocationWeather={getCurrentLocationWeather}
            changeUnits={changeUnits}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            searchQuery={allData.searchQuery}
          />
          <div className="error-message">
            <Error
              currentLocationErrorStatus={errorStatus.currentLocationError}
              noLocationFoundErrorStatus={errorStatus.noLocationFoundError}
              unitsErrorStatus={errorStatus.unitsError}
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
        errorLoadingStatus={errorStatus.errorLoading}
      />
    </div>
  );
}

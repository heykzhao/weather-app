/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

// Import components
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';
import Footer from './Footer';

// Import functions
import returnCoordinates from '../functions/getCurrentLocation';
import { getCityCoordinates, getCurrentCoordinatesWeather } from '../functions/getWeather';
import getCityNameByCoordinates from '../functions/getCityName';
import emptyWeatherArray from '../functions/emptyWeatherArray.json';

export default function LoadHandling({
  allData,
  setAllData,
  loading,
  setLoading,
  errorStatus,
  setErrorStatus,
}) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(allData.searchQuery);
    try {
      setLoading(true);
      const currentCoordinates = await getCityCoordinates(allData.searchQuery);
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
        searchQuery: '',
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
      setAllData((prevValue) => ({
        ...prevValue,
        searchQuery: '',
      }));
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

  // Loading logic (to display weather, error, or loading component)
  if (loading === true) {
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
  if (loading === false && errorStatus.errorLoading === false) {
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
  if (loading === false && errorStatus.errorLoading === true) {
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

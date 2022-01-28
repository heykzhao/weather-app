/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// Import styles
import './styles/Reset.css';
import './styles/App.css';

// // Import components
// import Loading from './components/Loading';
// import Error from './components/Error';
// import Header from './components/Header';
// import CurrentWeather from './components/CurrentWeather';
// import HourlyWeather from './components/HourlyWeather';
// import DailyWeather from './components/DailyWeather';
// import Footer from './components/Footer';
import LoadHandling from './components/LoadHandling';

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

  return (
    <div className="app-container">
      <LoadHandling
        allData={allData}
        setAllData={setAllData}
        loading={loading}
        setLoading={setLoading}
        errorStatus={errorStatus}
        setErrorStatus={setErrorStatus}
      />
    </div>
  );
}

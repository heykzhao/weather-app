import React from 'react';
import returnCoordinates from './functions/getCurrentLocation';
import { getCurrentCityWeather, getCurrentCoordinatesWeather } from './functions/getWeather';

function App() {
  async function defaultLoad() {
    try {
      const { lat, lon } = await returnCoordinates();
      const browserLocationWeather = await getCurrentCoordinatesWeather(lat, lon, 'metric');
      console.log(browserLocationWeather);
    } catch {
      const chicagoDefaultWeather = await getCurrentCityWeather('Chicago', 'metric');
      console.log(chicagoDefaultWeather);
    }
  }

  defaultLoad();

  return (
    <div className="app-container">Test</div>
  );
}

export default App;

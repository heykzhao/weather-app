import React from 'react';
import getCurrentCityWeather from './functions/getWeather';

function App() {
  const consoleLogClevelandWeather = async () => {
    const clevelandWeather = await getCurrentCityWeather('Cleveland', 'metric');
    console.log(clevelandWeather);
  };

  consoleLogClevelandWeather();

  return (
    <div className="app-container">Hey</div>
  );
}

export default App;

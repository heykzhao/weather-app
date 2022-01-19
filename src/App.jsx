import React from 'react';
import getWeather from './functions/getWeather';

function App() {
  getWeather();
  return (
    <div className="app-container">
      Hey
    </div>
  );
}

export default App;

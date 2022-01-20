/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function CurrentWeather({ item }) {
  const {
    currentDescription,
    currentDetails,
    currentFeelsLike,
    currentHumidity,
    currentTemp,
    currentTime,
    currentWindSpeed,
  } = item;

  const time = new Date(currentTime);
  return (
    <div className="current-weather-container">    </div>
  );
}

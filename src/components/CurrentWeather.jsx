/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function CurrentWeather({ item, city }) {
  const {
    currentDescription,
    currentDetails,
    currentFeelsLike,
    currentHumidity,
    currentTemp,
    currentTime,
    currentWindSpeed,
    currentIcon,
  } = item;

  const date = new Date(currentTime);
  const dayYearMonthDate = date.toLocaleString('en-us', {
    weekday: 'long', year: 'numeric', month: 'long', date: 'numeric',
  });
  const time = date.toLocaleTimeString([], {
    hour12: true, hour: '2-digit', minute: '2-digit',
  });

  const iconSource = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;

  return (
    <div className="current-weather-container">
      <div className="current-time">Last updated at: {dayYearMonthDate} at {time}</div>
      <div className="city-name">{city}</div>
      <div className="cw-temperature">{currentTemp}</div>
      <div className="cw-feels-like">{currentFeelsLike}</div>
      <div className="cw-description">{currentDescription}</div>
      <div className="cw-details">{currentDetails}</div>
      <div className="cw-humidity">{currentHumidity}</div>
      <div className="cw-wind-speed">{currentWindSpeed}</div>
      <img
        alt="Current weather icon"
        src={iconSource}
      />
    </div>
  );
}

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/CurrentWeather.css';

export default function CurrentWeather({ item, city, units }) {
  const {
    currentTime,
    currentTemp,
    currentFeelsLike,
    currentHumidity,
    currentWindSpeed,
    currentDescription,
    currentDetails,
    currentIcon,
  } = item;
  let tempUnitsToDisplay = '';
  let windSpeedUnitsToDisplay = '';

  if (units === 'metric') {
    tempUnitsToDisplay = '°C';
    windSpeedUnitsToDisplay = 'meters/sec';
  } else if (units === 'imperial') {
    tempUnitsToDisplay = '°F';
    windSpeedUnitsToDisplay = 'miles/hour';
  }

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
      <div className="cw-card">
        <div className="cw current-time">Last updated at: {dayYearMonthDate} at {time}</div>
        <div className="cw city-name">{city}</div>
        <img
          alt="Current weather icon"
          src={iconSource}
          className="cw cw-icon"
        />
        <div className="cw cw-description">{currentDescription}</div>
        <div className="cw cw-details">{currentDetails}</div>
        <div className="cw cw-temperature">{currentTemp}{tempUnitsToDisplay}</div>
        <div className="cw cw-feels-like">{currentFeelsLike}{tempUnitsToDisplay}</div>
        <div className="cw cw-humidity">{currentHumidity}%</div>
        <div className="cw cw-wind-speed">{currentWindSpeed} {windSpeedUnitsToDisplay}</div>
      </div>
    </div>
  );
}

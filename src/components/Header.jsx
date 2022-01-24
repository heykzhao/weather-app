/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Header.css';
import sweaterIcon from '../images/sweater.png';
import searchIcon from '../images/search.png';
import currentLocationIcon from '../images/current-location.png';

export default function Header({ getCurrentLocationWeather, changeUnits }) {
  return (
    <div className="header-container">
      <div className="logo-container">
        <div className="logo-container--logo">
          <img
            alt="Sweater by ColourCreatype on freeicons.io"
            src={sweaterIcon}
            className="logo-container--image"
          />
          <span className="logo-container--text">
            Sweater Weather
          </span>
        </div>
      </div>
      <div className="search-units-container">
        <div className="search-container">
          <div className="search-container--box">
            <button
              type="button"
              className="get-current-location"
              onClick={getCurrentLocationWeather}
            >
              <img
                alt="Current location icon by www.wishforge.games on freeicons.io"
                src={currentLocationIcon}
                className="current-location-icon"
                title="Get current location."
              />
            </button>
            <input
              name="search-city"
              type="text"
              placeholder="Search City"
              className="search--input"
            />
            <button type="button" className="search--button">
              <img
                alt="Search icon by Free Preloaders on freeicons.io"
                src={searchIcon}
              />
            </button>
          </div>
        </div>
        <div className="units-container">
          <button
            type="button"
            name="fahrenheit"
            className="unit-selector fahrenheit"
            onClick={changeUnits}
          >
            °F
          </button>
          <div className="unit-selector-separation">/</div>
          <button
            type="button"
            name="celsius"
            className="unit-selector celsius"
            onClick={changeUnits}
          >
            °C
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import '../styles/Header.css';
import sweaterIcon from '../images/sweater.png';
import searchIcon from '../images/search.png';

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <span className="logo-container--made-by">
          Made by
          <a href="https://github.com/heykzhao" target="_blank" rel="noreferrer"> heykzhao</a>
        </span>
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
            <input
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
          <div className="unit-selector fahrenheit">°F</div>
          <div className="unit-selector-separation">/</div>
          <div className="unit-selector celsius"> °C</div>
        </div>
      </div>
    </div>
  );
}

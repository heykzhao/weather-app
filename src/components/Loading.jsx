import React from 'react';
import '../styles/Loading.css';

export default function Loading() {
  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
      </div>
    </div>
  );
}

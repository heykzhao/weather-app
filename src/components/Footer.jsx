import React from 'react';

import '../styles/Footer.css';
import githubLogo from '../images/GitHub-Mark.png';

export default function Footer() {
  return (
    <div className="nameplate noselect">
      <span className="copyright">
        Made by
        <a href="https://github.com/heykzhao" target="_blank" rel="noreferrer"> heykzhao</a>
      </span>
      <span>
        <a href="https://github.com/heykzhao" target="_blank" rel="noreferrer">
          <img
            alt="Github Logo"
            src={githubLogo}
            className="github-logo"
          />
        </a>
      </span>
    </div>
  );
}

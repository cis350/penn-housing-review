// Banner.js

import React from 'react';
import '../styles/Banner.css';
import logo from '../aligned-logo.png'; // Replace this with your own logo file

function Banner() {
  return (
    <div className="banner">
      <div className="logo-title-container">
        <img src={logo} alt="Logo" className="banner-logo" />
        <h1>Profile</h1>
      </div>
      <div className="banner-welcome">Welcome</div>
    </div>
  );
}

export default Banner;

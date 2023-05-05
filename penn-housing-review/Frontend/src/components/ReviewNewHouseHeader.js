import './ReviewNewHouseHeader.css';
import React from 'react';
import logo from '../assets/logowhite.png';
import { ReviewPageURL, profileURL } from '../utils/utils';

function Logo() {
  return (
    <a href={ReviewPageURL} className="logo">
      <img src={logo} alt="logo" width="50" height="50" />
    </a>
  );
}

function Profile() {
  const username = localStorage.getItem('username');
  return (
    <a href={profileURL} className="profile">
      Welcome, {username}
    </a>
  );
}


export default function ReviewNewHouseHeader() {
  return (
    <header className="new-house-header">
      <Logo />

      <h1 className="new-house-header-title">Housing Review</h1>

      <Profile />
    </header>
  );
}

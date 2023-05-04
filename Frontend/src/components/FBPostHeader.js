import './FBPostPageStyles.css';
import * as React from 'react';
import logo from '../assets/P-2.png';
import { profileURL } from '../utils/utils';

function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logo} alt="logo" width="40" height="40" />
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

export default function Header() {
  return (
    <div className="header">
      <Logo />
      <h2 className="title">Housing Review</h2>
      <Profile username="User" />
    </div>
  );
}

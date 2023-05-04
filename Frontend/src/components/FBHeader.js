import '../FBHeader.css';
import React from 'react';
import logo from '../assets/logowhite.png';
import { searchURL, profileURL } from '../utils/utils';

function Logo() {
  return (
    <a href={searchURL} className="logo">
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

export default function Header({ title }) {
  return (
    <header className="fb-header">
      <Logo />

      <h1 className="fb-title">{title}</h1>

      <Profile />
    </header>
  );
}

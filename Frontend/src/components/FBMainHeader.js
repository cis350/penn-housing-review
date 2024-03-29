import './FBMainPageStyles.css';
import * as React from 'react';
import logo from '../assets/P-2.png';
import { searchURL, profileURL } from '../utils/utils';

function Logo() {
  return (
    <a href={searchURL} className="logo">
      <img src={logo} alt="logo" width="40" height="40" />
    </a>
  );
}

// function SearchBar() {
//     return <input type="text" placeholder="   Search for Post" className='search-bar' />;
// }

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
      {/* <SearchBar /> */}
      <Profile />
    </div>
  );
}

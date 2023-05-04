import './Main.css';
import React from 'react';
import logo from '../aligned-logo.png';



function ForYou() {
  return (
    <a href="/for-you" className="foryou header-button">
      for you
    </a>
  );
}

function ForumBoard() {
  return (
    <a href="/forum" className="forumBoard header-button">
      forum
    </a>
  );
}

function UserProfileHeader() {
  return (
    <header className="header">
        <a href="/search" >
        <img src={logo} alt="Logo" className="banner-logo" />
        </a>
      
      <div className="button-left">
        <ForYou />
        <ForumBoard />
      </div>
    </header>
  );
}

export default UserProfileHeader;

import './Main.css';
import React from 'react';

function Profile({ username }) {
  return (
    <a href="/user-profile" className="main-profile header-button">
      welcome, {username}
    </a>
  );
}

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

function MainHeader() {
  return (
    <header className="header">
      <div className="button-right">
        <Profile username={localStorage.getItem('username')} />
      </div>
      <div className="button-left">
        <ForYou />
        <ForumBoard />
      </div>
    </header>
  );
}

export default MainHeader;

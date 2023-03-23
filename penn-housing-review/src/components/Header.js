import './ReviewPage.css';
import * as React from "react";
import logo from '../assets/P-2.png';
import { Routes, Route } from "react-router-dom"
  
  function Logo() {
    return (
      <a href="/post-review" className="logo">
        <img src={logo} alt='logo' width="50" height="50"/>
      </a>
    )
  }
  
  function SearchBar() {
    return <input type="text" placeholder="Search..." className='search-bar' />;
  }
  
  function Profile({ username }) {
    return <a href="/user" className="profile">Welcome, {username}</a>;
  }

  export default function Header() {
    return (
      <header className='header'>
        <Logo />
        <h1 className='title'>Housing Review</h1>
        <SearchBar />
        <Profile username='Ken'/>
      </header>
    )
  }
import '../App.css';
import * as React from "react";
import logo from '../assets/P-2.png';
  
function Logo() {
    return (
        <a href="/main" className="logo">
        <img src={logo} alt='logo' width="40" height="40"/>
        </a>
    )
}


function Profile({ username }) {
    return <a href="/user" className="profile">Welcome, {username}</a>;
}

export default function Header() {
return (
    <div className="header">
        <Logo />
        <h2 className='title'>Housing Review</h2>
        <Profile username="User" />
    </div>
);
}
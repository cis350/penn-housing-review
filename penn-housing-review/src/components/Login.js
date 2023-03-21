import React, { useState } from "react";
import "./Login.css";

function Login() {
  // state variables for username and password input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle change events for input fields
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // handle click events for buttons
  const handleRegisterClick = () => {
    // logic for registering a new user
    console.log("Registering user:", username);
  };

  const handleLoginClick = () => {
    // logic for logging in an existing user
    console.log("Logging in user:", username);
  };

  return (
    <div className="login-container">
      {/* semi-transparent background overlay */}
      <div className="login-overlay"></div>
      <div className="login-form">
        <h1 className="login-popup-title">Login to Continue</h1>
        <div>
            <label className="login-input-title" htmlFor="username">Username:</label>
            <input
            className = "login-input-textbox"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            />
        </div>
        <div>
            <label className="login-input-title" htmlFor="password">Password:</label>
            <input
            className = "login-input-textbox"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            />
        </div>
        
    
        <div className="login-buttons">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
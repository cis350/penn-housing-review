import React, { useState } from "react";
import "./Login.css";
import loginUser from "../api/LoginAPI.js";
import InputBox from "./InputBox.js";
import UserContext from "../App.js";

function Login() { // will modify user ID once logged in
  const value = React.useContext(UserContext);  
  // state variables for username and password input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false); // if is register, displays a larger box

  // handle change events for input fields
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // handle click events for buttons
  const handleRegisterClick = () => {
    // logic for registering a new user
    console.log("Registering user");
    setIsRegister(true);
  };

  // handle click events for buttons
  const handleBackClick = () => {
    // logic for registering a new user
    console.log("Going back to login");
    setIsRegister(false);
  };

  /*
  const handleLoginClick = async () => {
    // logic for logging in an existing user
    console.log("Logging in user:", username);
    loginUserResponse = await loginUser(username, password);
  };*/

  async function handleLoginClick() {
    // Try to log in the user with the given credentials
    try {
      // Await for the loginUser function to resolve or reject
      const data = await loginUser(username, password);
      console.log(data);
      // If resolved, get the userID from the data object
      const userID = data.data.id;
      console.log(userID);
      // then send it to main page
      alert("logged in!");
      // Do something with the userID, such as storing it in localStorage or redirecting to another page
      localStorage.setItem('userID', userID);
      localStorage.setItem('username', username);

      window.location.href = '/';
    } catch (error) {
      // If rejected, handle the error by displaying a message or logging it
      alert('Login failed. Please check your username and password.');
      console.error(error);
    }
  }

  if (isRegister) {
    
    return (
      <UserContext.Consumer>
      <div className="login-container">
        {/* semi-transparent background overlay */}
        <div className="login-overlay"></div>
        <div className="login-form">
          <h1 className="login-popup-title">Create an Account</h1>
          <InputBox id = "username" val = {username} text = "Username: " handleVal = {handleUsernameChange}/>
          <InputBox id = "email" val = {email} text = "Email: " handleVal = {handleEmailChange}/>        
          <InputBox id = "password" val = {password} text = "Password: " handleVal = {handlePasswordChange}/>        
          <div className="login-buttons">
            <button onClick={handleBackClick}>Back</button>
            <button onClick={handleRegisterClick}>Register</button>
          </div>
        </div>
        
      </div>
      </UserContext.Consumer>
    );
  }

  return (
    <div className="login-container">
      {/* semi-transparent background overlay */}
      <div className="login-overlay"></div>
      <div className="login-form">
        <h1 className="login-popup-title">Login to Continue</h1>
        <InputBox id = "username" val = {username} text = "Username: " handleVal = {handleUsernameChange}/>
        <InputBox id = "password" val = {password} text = "Password: " handleVal = {handlePasswordChange}/>        
        <div className="login-buttons">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
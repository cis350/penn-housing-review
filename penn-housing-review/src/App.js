import React, { useState } from 'react';
import './App.css';
import Login from './components/Login.js';

export const UserContext = React.createContext();

function App() {

  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const user = {username: username, userID: userID, userEmail: userEmail, setUsername: setUsername, setUserID: setUserID, setUserEmail: setUserEmail};

  if (localStorage.getItem('userID') == null) {
    return (
      <UserContext.Provider value={user}>
      <Login />
    </UserContext.Provider>
    );
  }

  alert('Logged in with userID: ' + userID + " and username: " + username);

  return (
    <div>
      <text>Welcome, your user ID is: {localStorage.getItem('userID')} and your username is: {localStorage.getItem("username")}</text>
    </div>
  );

}

export default App;
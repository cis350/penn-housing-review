import React, { useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader.js'
import MainBody from './components/MainSearch2.js'

import Login from './components/Login.js';


import UserProfile from './components/UserProfile';
function App() {

  

  const username = 'JohnDoe';
  const posts = ['First post', 'Second post', 'Third post'];

  return (
      <div>
        <MainHeader />
        <MainBody />
        
      </div>
    
  
  )
}

export default App;
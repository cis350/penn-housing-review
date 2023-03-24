import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import MainHeader from './components/MainHeader.js'
import MainBody from './components/MainSearch2.js'
import FBMain from './components/FBMainPage.js';
import Login from './components/Login.js';
import UserProfile from './components/UserProfile';
import FBPostMainPage from './components/FBPostMainPage.js';
import {searchURL, profileURL, mainURL, forumURL, forumNewPostURL} from './utils/utils.js';

// Import your other components here
// import ComponentA from './components/ComponentA';
// import ComponentB from './components/ComponentB';
// ...

function App() {

  

  const username = 'JohnDoe';
  const posts = ['First post', 'Second post', 'Third post'];

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            {/* Add links for your other components */}
            {/* <li>
              <Link to="/component-a">Component A</Link>
            </li>
            <li>
              <Link to="/component-b">Component B</Link>
            </li> */}
            {/* ... */}
          </ul>
        </nav>

        <Routes>
          <Route path={searchURL} element={<div><MainHeader /> <MainBody /></div> } />
          <Route path={profileURL} element={<UserProfile username={username} posts={posts} />} />
          <Route path={mainURL} element={<div><Login /><MainHeader /> <MainBody /></div> } />
          <Route path={forumURL} element={<div><FBMain /></div> } />
          <Route path={forumNewPostURL} element={<div><FBPostMainPage /></div> } />
          {/* Add routes for your other components */}
          {/* <Route path="/component-a" element={<ComponentA />} />
          <Route path="/component-b" element={<ComponentB />} /> */}
          {/* ... */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

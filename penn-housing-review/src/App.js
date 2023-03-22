import './App.css';
import * as React from "react";
import DescriptionView from "./components/DescriptionView";
import Header from "./components/Header";
import ReviewView from "./components/ReviewView";

function App() {
  const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  return (
    <div className="container">
      <Header />
      <div className="main">
        <DescriptionView aptname='The Chestnut' aptimg='https://via.placeholder.com/200' 
        aptratings={[4.4,2.2,3.9]} aptdesc={desc} />
        <span className='vl' />
        <ReviewView aptid={1}/>
      </div>
    </div>
  );
}


export default App;
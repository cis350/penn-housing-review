// Import React and useState hook
import React, { useState } from 'react';
import logo from '../assets/logo2.png';

// Import the searchHouse function from another file
import {searchHouse} from '../api/MainSearchApi';
import { NewHouseURL, ReviewPageURL } from '../utils/utils';
import './Main.css';

// Define a custom component for the logo and title
function LogoTitle() {
  return (
    <div className="logo-title">
      <img src={logo} alt="logo"/>
      <h1 className="main-title">Penn Housing Review</h1>
    </div>
  );
}

// Define a custom component for the search box and results
function Search() {
  // Define a state variable to store the keyword entered by the user
  const [keyword, setKeyword] = useState('');

  // Define a state variable to store the results fetched from the API
  const [results, setResults] = useState([]);

  // Define a function that handles the change event of the input element
  const handleChange = async (event) => {
    // Get the value of the input element
    const { value } = event.target;

    // Update the keyword state variable with the value
    setKeyword(value);

    // If the value is not empty, call the searchHouse function to get the results
    if (value) {
      try {
        // Await for the promise returned by searchHouse to resolve with data
        const data = await searchHouse(value, 4);
        // Update the results state variable with data
        setResults(data);
      } catch (error) {
        // Handle any error from searchHouse function call
      }
    } else {
      // If value is empty, clear results state variable
      setResults([]);
    }
  };

  return (
    <div className="search-box">
      <input
        className="search"
        type="text"
        placeholder="Search for a place..."
        value={keyword}
        onChange={handleChange}
      />
      <ul className="search-results">
        {results.map((house) => (
          <li>
            <a href={ReviewPageURL}>{house.name}</a>
          </li>
        ))}
        <li>
          <a href={NewHouseURL}> + add a house</a>
        </li>
      </ul>
    </div>
  );
}

// Define a custom component for main body of page
function MainBody() {
  return (
    <div className="main-body">
      <LogoTitle />
      <Search />
    </div>
  );
}

export default MainBody;

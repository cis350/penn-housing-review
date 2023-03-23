/*// Import React and useState hook
import React, { useState } from "react";
import logo from "../assets/logo2.png"

// Define a custom component for the logo and title
function LogoTitle() {
  return (
    <div className="logo-title">
      <img src={logo} />
      <h1 className="main-title">Penn Housing Review</h1>
    </div>
  );
}

// Define a custom component for the search box and results
function Search() {
  // Define a state variable to store the keyword entered by the user
  const [keyword, setKeyword] = useState("");

  // Define a state variable to store the results fetched from the API
  const [results, setResults] = useState([]);

  // Define a function that handles the change event of the input element
  const handleChange = (event) => {
    // Get the value of the input element
    const value = event.target.value;

    // Update the keyword state variable with the value
    setKeyword(value);

    // If the value is not empty, call the API to get the results
    if (value) {
      fetch(`/posts/search?keyword=${value}&limit=4`)
        .then((response) => response.json())
        .then((data) => {
          // Update the results state variable with the data
          setResults(data);
        })
        .catch((error) => {
          // Handle any error from the API call
          console.error(error);
        });
    } else {
      // If the value is empty, clear the results state variable
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
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Define a custom component for the main body of the page
function MainBody() {
  return (
    <div className="main-body">
      <LogoTitle />
      <Search />
    </div>
  );
}

export default MainBody;*/

// Import React and useState hook
import React, { useState } from "react";
import logo from "../assets/logo2.png"


// Import the searchHouse function from another file
import { searchHouse } from "../api/MainSearchApi.js";

// Define a custom component for the logo and title
function LogoTitle() {
  return (
    <div className="logo-title">
      <img src={logo} />
      <h1 className="main-title">Penn Housing Review</h1>
    </div>
  );
}

// Define a custom component for the search box and results
function Search() {
  // Define a state variable to store the keyword entered by the user
  const [keyword, setKeyword] = useState("");

  // Define a state variable to store the results fetched from the API
  const [results, setResults] = useState([]);

  // Define a function that handles the change event of the input element
  const handleChange = async (event) => {
    // Get the value of the input element
    const value = event.target.value;

    // Update the keyword state variable with the value
    setKeyword(value);

    // If the value is not empty, call the searchHouse function to get the results
    if (value) {
      try {
        // Await for the promise returned by searchHouse to resolve with data
        const data = await searchHouse(value, 4);
        // Update the results state variable with data
        setResults(data);
        console.log (data);
      } catch (error) {
        // Handle any error from searchHouse function call
        console.error(error);
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
        {results.map((name) => (
            <li>{name}</li>
        ))}
        <li> + add a house</li>
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
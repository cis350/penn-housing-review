import axios from 'axios';

const searchHouse = async (keyword) => 
  // Create an object with keyword and limit properties
  // Return a promise that resolves with the response data or rejects with an error
  axios
    .get('http://localhost:3500/houses')
    .then((response) => {
      // Filter the response data by houseName property

      const filtered = response.data.filter((search) =>
        search.houseName.includes(keyword.toUpperCase())
      );
      const results = filtered.map((search) => search.houseName);
      return results;
    })
    .catch((error) => {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
      } else if (error.request) {
        // The request was made but no response was received
      } else {
        // Something happened in setting up the request that triggered an Error
      }
      // Reject the promise with the error object
      return Promise.reject(error);
    });
;

export default searchHouse;
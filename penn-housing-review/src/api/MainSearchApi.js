import axios from "axios";
import { rootURL } from "../utils/utils";


/*async function searchHouse(keyword, limit) {
  // Create an object with keyword and limit properties
  const params = { keyword, limit };
  // Return a promise that resolves with the response data or rejects with an error
  return axios.get('/posts/search', { params })
    .then(response => response.houseName)
    .catch(error => {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error status', error.response.status);
        console.error('Error data', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message', error.message);
      }
      // Reject the promise with the error object
      return Promise.reject(error);
    });
}*/

/*async function searchHouse(keyword, limit) {
  // Create an object with keyword and limit properties
  const params = { keyword, limit };
  // Return a promise that resolves with the response data or rejects with an error
  return axios.get('/posts/search', { params })
    .then(response => {
      // Filter the response data by houseName property
      return response.data.filter(post => post.search.houseName.includes(keyword));
    })
    .catch(error => {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error status', error.response.status);
        console.error('Error data', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message', error.message);
      }
      // Reject the promise with the error object
      return Promise.reject(error);
    });
}*/

export const searchHouse = async (keyword, limit) => {
  // Create an object with keyword and limit properties
  const params = { keyword, limit };
  // Return a promise that resolves with the response data or rejects with an error
  return axios.get('http://localhost:3500/search')
    .then(response => {
      // Filter the response data by houseName property

      const filtered = response.data.filter(search => search.houseName.includes(keyword.toUpperCase()));
      const results = filtered.map(search => search.houseName);
      return results;
    })
    .catch(error => {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error status', error.response.status);
        console.error('Error data', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message', error.message);
      }
      // Reject the promise with the error object
      return Promise.reject(error);
    });
}

/*
async function searchHouse (keyword, limit){
  // Create an object with keyword and limit properties
  const params = { keyword, limit };
  // Return a promise that resolves with the response data or rejects with an error
  return axios.get(rootURL + '/search')
    .then(response => {
      // Filter the response data by houseName property

      const filtered = response.data.filter(search => search.houseName.includes(keyword.toUpperCase()));
      const results = filtered.map(search => search.houseName);
      return results;
    })
    .catch(error => {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error status', error.response.status);
        console.error('Error data', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message', error.message);
      }
      // Reject the promise with the error object
      return Promise.reject(error);
    });
}


export default searchHouse;*/
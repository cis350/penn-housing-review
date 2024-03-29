import axios from 'axios';
import { rootURL } from '../utils/utils';

async function registerUser(username, email, password) {
  // Create an object with username and password properties
  const followedPosts = [];
  const register = true;
  const data = {
    username,
    email,
    password, 
    followedPosts, 
    register
  };


  try {
    const response = await axios.post(`${rootURL}/users`, data);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error('registration failed');
  }

  /*
    // Return a promise that resolves with the response data or rejects with an error
    return axios.post('/login', data)
      .then(response => response.data)
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
      }); */
}

export default registerUser;

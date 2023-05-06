import axios from 'axios';
import { rootURL } from '../utils/utils';

export const getApartmentById = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/houses/${id}`);
    return response;
  } catch (err) {
    // do something
  }
  return null;
};

export const getReviewsById = async(aptid) => {
    try {
        const response = await axios.get(`${rootURL}/reviews/${aptid}`);
        console.log();
        return response;
    } catch (err) {
        console.error('error', err.message);
    }
    return null;
}

export const updateLike = async(id, likes) => {
    try {
        console.log(likes);
        const response = await axios.put(`${rootURL}/reviews/${id}`, `like=${likes}`)
        console.log("likes", response);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
    return null;
}

export const submitReview = async(aptid, username, rating1, rating2, rating3, text) => {
    try {
        const response = await axios.post(`${rootURL}/reviews`, {
            username,
            ratings: [rating1, rating2, rating3],
            desc: text,
            aptid
        });
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
    return null;
}

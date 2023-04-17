import axios from 'axios';
import { rootURL } from '../utils/utils';

export const getApartmentById = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/apartments/${id}`);
    return response;
  } catch (err) {
    // do something
  }
  return null;
};

export const getReviewsById = async(aptid) => {
    try {
        const response = await axios.get(`${rootURL}/reviews/${aptid}`);
        console.log("reviews", response.data);
        return response;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const updateLike = async(aptid, id, username, ratings, likes, desc) => {
    try {
        const response = await axios.put(`${rootURL}/reviews/${id}`, {
            User: username,
            ratings: ratings,
            likes: likes,
            desc: desc
        });
        console.log("likes", response.data);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const submitReview = async(aptid, username, rating1, rating2, rating3, text) => {
    try {
        const response = await axios.post(`/reviews${aptid}`, {
            User: username,
            ratings: [rating1, rating2, rating3],
            likes: 0,
            desc: text
        });
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

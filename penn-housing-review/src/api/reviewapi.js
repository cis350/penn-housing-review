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

export const getReviewsById = async (aptid) => {
  try {
    const response = await axios.get(`${rootURL}/reviews${aptid}`);
    return response;
  } catch (err) {
    // do something
  }
  return null;
};

export const updateLike = async (aptid, id, username, ratings, likes, desc) => {
  try {
    const response = await axios.put(`${rootURL}/reviews${aptid}/${id}`, {
      User: username,
      ratings,
      likes,
      desc
    });
    return response.data;
  } catch (err) {
    // do something
  }
  return null;
};

export const submitReview = async (
  aptid,
  username,
  rating1,
  rating2,
  rating3,
  text
) => {
  try {
    const response = await axios.post(`${rootURL}/reviews${aptid}`, {
      User: username,
      ratings: [rating1, rating2, rating3],
      likes: 0,
      desc: text
    });
    return response.data;
  } catch (err) {
    // do something
  }
  return null;
};

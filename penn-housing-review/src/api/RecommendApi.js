import axios from 'axios';
import { rootURL } from '../utils/utils';

const fetchHouses = async (filters) => {
  try {
    const response = await axios.get(`${rootURL}/houses`, {
      filters
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default fetchHouses;
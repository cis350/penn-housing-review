import axios from 'axios';
import { rootURL } from '../utils/utils';

const fetchHouses = async (filters) => {
  console.log('fetching houses');
  try {
    const response = await axios.post(`${rootURL}/houses`, filters);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default fetchHouses;

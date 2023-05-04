import axios from 'axios';
import { rootURL } from '../utils/utils';

async function addHouse(house) {
  try {
    const response = await axios.post(`${rootURL}/newHouse`, house);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error('Adding house failed');
  }
}

export default addHouse;

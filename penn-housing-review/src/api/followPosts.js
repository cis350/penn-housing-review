import axios from 'axios';
import { rootURL } from '../utils/utils';

export async function followPost(houseid, username) {
  // Replace this with the actual API endpoint for fetching user posts

  const apiUrl = `${rootURL}/users?username=${username}`;
  try {
    const data = await axios.get(apiUrl);
    const users = data.data;
    if (users.length > 0) {
      users[0].followedPosts.push(houseid);
    } else {
      throw new Error('User does not exist');
    }

    const userUrl = `${rootURL}/users/${users[0].id}`;

    const response = await axios.put(userUrl, users[0]);

    if (response.status === 200) {
      return true;
    }
    throw new Error(`An error occurred: ${response.statusText}`);
  } catch (error) {
    console.error('Error adding to user follow list:', error);
    return false;
  }
}

export async function unfollowPost(houseid, username) {
  const apiUrl = `${rootURL}/users?username=${username}`;
  try {
    const data = await axios.get(apiUrl);
    const users = data.data;
    if (users.length > 0) {
      users[0].follows = users[0].followedPosts.filter((id) => id !== houseid);
    } else {
      throw new Error('User does not exist');
    }

    const userUrl = `${rootURL}/users/${users[0].id}`;

    const response = await axios.put(userUrl, users[0]);

    if (response.status === 200) {
      return true;
    }
    throw new Error(`An error occurred: ${response.statusText}`);
  } catch (error) {
    console.error('Error removing from user follow list:', error);
    return false;
  }
}

import axios from 'axios';
import { rootURL } from "../utils/utils";

export async function getUserPosts(username) {
  // Replace this with the actual API endpoint for fetching user posts
  const apiUrl = `${rootURL}/posts?userId=${username}`;

  try {
    const response = await axios.get(apiUrl);
    const posts = response.data;

    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
}

export async function updateUserPassword(username, password, newPassword) {
  try {
    const response = await axios.get(`${rootURL}/login`, {
      params: {
        username,
        password,
      },
    });

    if (response.data.length > 0) {
      const user = response.data[0];
      const updateResponse = await axios.patch(`${rootURL}/login/${user.id}`, {
        password: newPassword,
      });

      if (updateResponse.status === 200) {
        console.log('Password updated successfully:', updateResponse.data);
        return true;
      } 
        console.log('Failed to update password:', updateResponse.status);
        return false;
      
    } 
      console.log('Invalid username or password. Failed to update password.');
      return false;
    
  } catch (error) {
    console.error('Error updating password:', error.message);
    return false;
  }
}
  
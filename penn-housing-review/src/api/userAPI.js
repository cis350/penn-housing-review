import axios from 'axios';
export async function getUserPosts(username) {
    // Replace this with the actual API endpoint for fetching user posts
    const apiUrl = `http://localhost:8080/users?username=${username}`;
  
    try {
      const response = await axios.get(apiUrl);
      const users = response.data;
  
      if (users.length > 0) {
        return users[0].posts;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  }

  export async function updateUserPassword(username, password, newPassword) {
    const apiUrl = `http://localhost:8080/users/${username}/update-password`;
  
    try {
      const response = await axios.put(apiUrl, {
        password,
        newPassword,
      });
  
      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating user password:', error);
      return false;
    }
  }
  
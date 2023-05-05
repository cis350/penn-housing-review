import axios from 'axios';
import { rootURL } from '../utils/utils';

export async function followPost(houseid, username) {
  // Replace this with the actual API endpoint for fetching user posts

  try{
      const userUrl = `${rootURL}/users/updateFollowedPosts`;
    // const apiUrl = `${rootURL}/users?username=${username}`;
    // const testUrl = `${rootURL}/users/updateFollowedPosts`;

    const postId = houseid;
    
    const response = await axios.post(userUrl, null, {params: {username, postId}});
    console.log(response.data);
    if (response.status === 200) {
      return true;
    } 
    
    throw new Error(`An error occurred in the backend: ${response.statusText}`);
    
  } catch(err){
    console.error('Error updating follow list:', err);
    return false;
  }
  
  
 /*
  const apiUrl = `${rootURL}/users?username=${username}`;
  console.log(apiUrl);
  try {
    const data = await axios.get(apiUrl);
    const users = data.data;
    if (users) {

      if (!users.followedPosts.includes(houseid)) {
        users.followedPosts.push(houseid);
      } else{
        users.followedPosts = users.followedPosts.filter((id) => id !== houseid);
      }
    } else {
      throw new Error('User does not exist');
    }

    const userUrl = `${rootURL}/users/updateFollowedPosts?username=${users.username}`;

    

    if (response.status === 200) {
      return true;
    }
    throw new Error(`An error occurred: ${response.statusText}`);
  } catch (error) {
    console.error('Error adding to user follow list:', error);
    return false;
  } */

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

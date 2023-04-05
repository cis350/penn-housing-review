import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';
import { TextField,Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Banner from './Banner';
import { getUserPosts, updateUserPassword } from '../api/userAPI';

function UserProfile() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [username] = useState(localStorage.getItem('username') || '');

  useEffect(() => {

    const fetchPosts = async () => {
      const userPosts = await getUserPosts(username);
      setPosts(userPosts);
    };

    fetchPosts();
  }, [username]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }

    // Call the API function to update the user password
    const isPasswordUpdated = await updateUserPassword(
      username,
      password,
      newPassword,
    );

    if (isPasswordUpdated) {
      alert('Password updated successfully!');
    } else {
      alert('Error updating password. Please try again.');
    }

  };

  return (
    <div className="user-profile">
      <Banner />

      <div className="user-profile-content" >
      <div className="user-info-header">
        <h1>Your Info</h1>
      </div>
      <form onSubmit={handlePasswordChange} className="password-change-form">
      <TextField
        id="password"
        label="Current Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        data-testid="current-password" // Add this line
        />

    <TextField
        id="new-password"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        data-testid="new-password" // Add this line
        />

    <TextField
        id="confirm-password"
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        data-testid="confirm-password" // Add this line
        />

    <Button type="submit" variant="contained" color="primary" data-testid="change-password">
        Change Password
        </Button>
        </form>


      <div className="logout-container">
        {/* Update the logout button */}
        <Button
          variant="contained"
          color="primary"
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('userID');
            localStorage.removeItem('username');
            window.location.href = '/';
          }}
        />
      </div>
      <h1>Posts</h1>
          {posts.map((post) => (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        
      </div>

      
    </div>
  );
}

export default UserProfile;

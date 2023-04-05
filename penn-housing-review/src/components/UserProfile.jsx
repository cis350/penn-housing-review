import React, { useState, useEffect } from 'react';
import { getUserPosts, updateUserPassword } from '../api/userAPI';
import '../styles/UserProfile.css';
import { TextField, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Banner from './Banner';

function UserProfile({ username }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [posts, setPosts] = useState([]);

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
      newPassword
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

      <div className="user-profile-content">
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
            data-testid="current-password"
          />

          <TextField
            id="new-password"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            data-testid="new-password"
          />

          <TextField
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            data-testid="confirm-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            data-testid="change-password"
          >
            Change Password
          </Button>

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
            >
              Log out
            </Button>
          </div>
        </form>

        <h3>Posts</h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          className="posts-container"
        >
          {posts.map((post, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

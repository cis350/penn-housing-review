import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import UserProfile from '../components/UserProfile';
import { getUserPosts, updateUserPassword } from '../api/userAPI';

jest.mock('../api/userAPI');

describe('UserProfile', () => {
  const testUsername = 'testuser';
  const testPosts = [
    {
      title: 'Post 1',
      description: 'Description 1'
    },
    {
      title: 'Post 2',
      description: 'Description 2'
    }
  ];

  beforeEach(() => {
    getUserPosts.mockResolvedValue(testPosts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders UserProfile without crashing', async () => {
    await act(async () => {
      render(<UserProfile username={testUsername} />);
    });
    expect(screen.getByText('Your Info')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });

  it('displays user posts', async () => {
    await act(async () => {
      render(<UserProfile username={testUsername} />);
    });
    expect(getUserPosts).toHaveBeenCalledWith(testUsername);
    
    await waitFor(() => {
      testPosts.forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.description)).toBeInTheDocument();
      });
    });
  });

  it('handles password change', async () => {
    updateUserPassword.mockResolvedValue(true);
    await act(async () => {
      render(<UserProfile username={testUsername} />);
    });
  
    fireEvent.change(screen.getByTestId('current-password').querySelector('input'), { target: { value: 'current_password' } });
    fireEvent.change(screen.getByTestId('new-password').querySelector('input'), { target: { value: 'new_password' } });
    fireEvent.change(screen.getByTestId('confirm-password').querySelector('input'), { target: { value: 'new_password' } });
  
    await act(async () => {
      fireEvent.click(screen.getByTestId('change-password'));
    });
  
    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith(testUsername, 'current_password', 'new_password');
    });
  });
  
  it('shows error when new and confirm password do not match', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    await act(async () => {
      render(<UserProfile username={testUsername} />);
    });
    fireEvent.change(screen.getByTestId('new-password').querySelector('input'), { target: { value: 'new_password' } });
    fireEvent.change(screen.getByTestId('confirm-password').querySelector('input'), { target: { value: 'wrong_password' } });
  
    await act(async () => {
      fireEvent.click(screen.getByTestId('change-password'));
    });
  
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('New password and confirm password do not match!');
    });
  
    alertSpy.mockRestore();
  });

});

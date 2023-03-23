import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';

// A simple test to check if the UserProfile component renders correctly
test('renders UserProfile component', () => {
  render(<UserProfile />);
  const headerElement = screen.getByText(/Your Info/i);
  expect(headerElement).toBeInTheDocument();
});

// A test to check if the logout button is present in the UserProfile component
test('renders logout button', () => {
  render(<UserProfile />);
  const logoutButton = screen.getByText(/Log out/i);
  expect(logoutButton).toBeInTheDocument();
});

// A test to check if the form submits correctly and displays an alert when the new and confirm passwords do not match
test('displays an alert when new and confirm passwords do not match', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<UserProfile />);
  const currentPasswordInput = screen.getByLabelText(/Current Password/i);
  const newPasswordInput = screen.getByLabelText(/New Password/i);
  const confirmPasswordInput = screen.getByLabelText(/Confirm New Password/i);
  const submitButton = screen.getByText(/Change Password/i);

  fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword' } });
  fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
  fireEvent.click(submitButton);

  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock).toHaveBeenCalledWith('New password and confirm password do not match!');

  alertMock.mockRestore();
});

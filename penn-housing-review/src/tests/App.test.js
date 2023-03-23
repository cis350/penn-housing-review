/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewPage from './components/ReviewPage';

test('renders app page', () => {
  const { getByText } = render(<ReviewPage />);
  const linkElement = getByText(/Chestnut/);
  expect(linkElement).toBeInTheDocument();
});

test('button: On Campus Housing', async () => {
  render(<ReviewPage />);
  const button = screen.getByLabelText('button', { name: /10/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);})

// Import React Testing Library and React

// Import the components you want to test
import App from '../App.js';
import MainHeader from '../components/MainHeader.js';
import MainBody from '../components/MainSearch2.js';

// Test if App renders MainHeader and MainBody components
test('renders MainHeader and MainBody', () => {
  // Render App component
  render(<App />);
  // Expect MainHeader element to be in the document
  expect().toBeInTheDocument();
  // Find MainBody element by its role
  const mainBody = screen.getByRole('main');
  // Expect MainBody element to be in the document
  expect(mainBody).toBeInTheDocument();
});

// Test if MainHeader renders Profile, ForYou and ForumBoard components
test('renders Profile, ForYou and ForumBoard', () => {
  // Render MainHeader component with a mock username prop
  render(<MainHeader username="testuser" />);
  // Find Profile element by its text content
  const profile = screen.getByText(/welcome, testuser/i);
  // Expect Profile element to be in the document
  expect(profile).toBeInTheDocument();
  // Find ForYou element by its text content
  const forYou = screen.getByText(/for you/i);
  // Expect ForYou element to be in the document
  expect(forYou).toBeInTheDocument();
  // Find ForumBoard element by its text content
  const forumBoard = screen.getByText(/forum/i);
  // Expect ForumBoard element to be in the document
  expect(forumBoard).toBeInTheDocument();
})

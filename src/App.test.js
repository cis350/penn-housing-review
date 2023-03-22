/**
* @jest-environment jsdom
*/

import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from './App';
import FBPostPage from './components/FBPostPage';


test('text: post your thread', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Post Your Thread/i);
  expect(posting).toBeInTheDocument();
});
test('text: Title', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Title/i);
  expect(posting).toBeInTheDocument();
});
test('text: Category', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Category/i);
  expect(posting).toBeInTheDocument();
});
test('text: Content', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Content/i);
  expect(posting).toBeInTheDocument();
});

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

  await userEvent.click(button); 

});

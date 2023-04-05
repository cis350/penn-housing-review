import React from 'react';
import { render, screen } from '@testing-library/react';
import FBMainPage from '../components/FBMainPage';

test('text: Housing Review', () => {
  render(<FBMainPage />);
  const text = screen.getByText(/Housing Review/i);
  expect(text).toBeInTheDocument();
});

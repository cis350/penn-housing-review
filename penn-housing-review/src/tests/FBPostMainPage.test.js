import React from 'react';
import { render, screen } from '@testing-library/react';
import FBPostMainPage from '../components/FBPostMainPage';

test('text: Housing Review', () => {
  render(<FBPostMainPage />);
  const text = screen.getByText(/Housing Review/i);
  expect(text).toBeInTheDocument();
});

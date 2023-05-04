import React from 'react';
import { render, screen } from '@testing-library/react';
import FBPostHeader from '../components/FBPostHeader';

test('text: Housing Review', () => {
  render(<FBPostHeader />);
  const text = screen.getByText(/Housing Review/i);
  expect(text).toBeInTheDocument();
});

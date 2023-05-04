import React from 'react';
import { render, screen } from '@testing-library/react';
import FBNotifyButtom from '../components/FBNotifyButtom';

test('text: Like', () => {
  render(<FBNotifyButtom />);
  const notifyIcon = screen.getByTestId('notify-icon');
  expect(notifyIcon).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import FBMainFilter from '../components/FBMainFilter';

test('text: Housing', () => {
    render(<FBMainFilter />);
    const text = screen.getByText(/Housing/i);
    expect(text).toBeInTheDocument();
});

test('button: On Campus Housing', async () => {
    render(<FBMainFilter />);
    const button = screen.getByRole('button', { name: /Make a Post/i });
    expect(button).toBeInTheDocument();
  
    await userEvent.click(button);
    expect(button).toHaveStyle('background-color: rgb(25, 118, 210)');
  
});
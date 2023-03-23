/**
 * @jest-environment jsdom
 */


import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('text: Housing Review', () => {
    render(<App />);
    const text = screen.getByText(/Housing Review/i);
    expect(text).toBeInTheDocument();
});
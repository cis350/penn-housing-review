/**
 * @jest-environment jsdom
 */


import React from 'react';
import { render, screen } from '@testing-library/react';
import FBMainHeader from '../components/FBMainHeader';

test('text: Housing Review', () => {
    render(<FBMainHeader />);
    const text = screen.getByText(/Housing Review/i);
    expect(text).toBeInTheDocument();
});


test('text: Housing Review', () => {
    render(<FBMainHeader />);
    const text = screen.getByText(/Welcome,/i);
    expect(text).toBeInTheDocument();
});
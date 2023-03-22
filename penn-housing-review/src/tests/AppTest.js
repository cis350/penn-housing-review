/**
 * @jest-environment jsdom
 */

import React from 'react';
// import the UI testing matchers
import '@testing-library/jest-dom/extend-expect';
// import DOM query functions
import { render, screen } from '@testing-library/react';
// import user event
import userEvent from '@testing-library/user-event';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';
// import the component
import Filter from '../components/FBMainFilter';

// test the component
describe('Filter', () => {
    test('renders Filter component', () => {
        const { getByText } = render(<Filter />);
        expect(getByText('Filter')).toBeInTheDocument();    
    });
    

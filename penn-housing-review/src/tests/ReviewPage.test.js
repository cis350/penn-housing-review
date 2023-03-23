import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ReviewPage from '../components/ReviewPage';

test('renders app page', () => {
    const { getByText } = render(<ReviewPage />);
    const linkElement = getByText(/Filter/);
    expect(linkElement).toBeInTheDocument();
});




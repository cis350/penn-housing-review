import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewNewHouseHeader from '../components/ReviewNewHouseHeader';
import { profileURL } from '../utils/utils';

describe('ReviewNewHouseHeader component', () => {
  it('renders the logo', () => {
    render(<ReviewNewHouseHeader />);
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<ReviewNewHouseHeader />);
    const titleElement = screen.getByText('Housing Review');
    expect(titleElement).toBeInTheDocument();
  });

});



import React from 'react';
import { render, screen } from '@testing-library/react';
import MainHeader from '../components/MainHeader.js';



test('ForYouButtonDisplayTest', () => {
  render (<MainHeader />);
  const forYouBtn = screen.getByText(/for you/i);
  expect(forYouBtn).toBeInTheDocument();
  
})


test('ForumButtonDisplayTest', () => {
    render (<MainHeader />);
    const forum = screen.getByText(/forum/i);
    expect(forum).toBeInTheDocument();
    
  })



test('ProfileButtonDisplayTest', () => {
    // render the component with a mock username prop
    render(<MainHeader username="Alice" />);
  
    // find the element with the data-testid attribute "profile-link"
    const linkElement = screen.getByText(/welcome/i);

    // check if the element has the correct href attribute
    expect(linkElement).toHaveAttribute('href', '/user-profile');
  
  });
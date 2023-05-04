import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainBody from '../components/MainSearch2.js';

test('LogoDisplayTest', () => {
  render(<MainBody />);
  const logo = document.querySelector('img');
  expect(logo.src).toContain('logo2.png');
});

test('TitleDisplayTest', () => {
  render(<MainBody />);
  const title = screen.getByText(/Penn Housing Review/i);
  expect(title).toBeInTheDocument();
});

test('SearchBarDisplayTest', async () => {
  // render the component
  render(<MainBody />);

  // find the element with the data-testid attribute "search"
  const searchInput = screen.getByPlaceholderText('Search for a place...');
  // check if the element has the correct placeholder
  expect(searchInput).toHaveAttribute('placeholder', 'Search for a place...');

  // simulate typing "New York" in the input element
  fireEvent.change(searchInput, { target: { value: 'an' } });

  // check if the input element value is updated
  expect(searchInput.value).toBe('an');

  // find the element with the data-testid attribute "search-results"
  const listElement = screen.getByText('+ add a house');

  expect(listElement).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';
import FBMainFilter from '../components/FBMainFilter';

test('text: Category', () => {
  render(<FBMainFilter />);
  const text = screen.getByText(/Category/i);
  expect(text).toBeInTheDocument();
});

test('button: Make a Post', async () => {
  render(<FBMainFilter />);
  const button = screen.getByRole('button', { name: /Make a Post/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(button).toHaveStyle('background-color: rgb(25, 118, 210)');
});

test('click On Campus radio option', async () => {
  render(<FBMainFilter />);
  const button = screen.getByRole('radio', { name: 'On Campus' });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(button).toBeChecked();
});

test('click Off Campus radio option', async () => {
  render(<FBMainFilter />);
  const button = screen.getByRole('radio', { name: 'Off Campus' });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(button).toBeChecked();
});

test('click All Housing Types radio option', async () => {
  render(<FBMainFilter />);
  const button = screen.getByRole('radio', { name: 'All Housing Types' });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(button).toBeChecked();
});

test('click All categories radio option', async () => {
  render(<FBMainFilter />);
  const button = screen.getByRole('radio', { name: 'All Housing Types' });
  expect(button).toBeInTheDocument();
  const buttonOther = screen.getByRole('radio', { name: 'All Categories' });

  await userEvent.click(buttonOther);
  expect(buttonOther).toBeChecked();
});

test('click Discussion+Off Campus radio option', async () => {
  render(<FBMainFilter />);
  const button = screen.getByRole('radio', { name: 'Discussion' });
  expect(button).toBeInTheDocument();

  const buttonOther = screen.getByRole('radio', { name: 'Off Campus' });

  await userEvent.click(button);
  await userEvent.click(buttonOther);
  expect(button).toBeChecked();
  expect(buttonOther).not.toBeChecked();
});

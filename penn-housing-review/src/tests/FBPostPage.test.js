/**
* @jest-environment jsdom
*/

import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import FBPostPage from '../components/FBPostPage';
import userEvent from '@testing-library/user-event';

test('text: post your thread', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Post Your Thread/i);
  expect(posting).toBeInTheDocument();
});

test('text: Title', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Title/i);
  expect(posting).toBeInTheDocument();
});

test('text: Category', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Category/i);
  expect(posting).toBeInTheDocument();
});

test('text: Content', () => {
  render(<FBPostPage />);
  const posting = screen.getByText(/Content/i);
  expect(posting).toBeInTheDocument();
});

// test the presence of the buttons
test('button: On Campus Housing', async () => {
  render(<FBPostPage />);
  const button = screen.getByRole('button', { name: /On Campus/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(button).toHaveStyle('background-color: rgb(25, 118, 210)');

});

test('button: cancel On Campus Housing', async () => {
  render(<FBPostPage />);
  const button = screen.getByRole('button', { name: /On Campus/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  await userEvent.click(button);
  expect(button).toHaveStyle('background-color: transparent');

});

test('button: Off Campus Housing', async () => {
  render(<FBPostPage />);
  const buttonOne = screen.getByRole('button', { name: /Off Campus/i });
  expect(buttonOne).toBeInTheDocument();

  await userEvent.click(buttonOne);
  expect(buttonOne).toHaveStyle('background-color: rgb(25, 118, 210)');

});

test('button: cancel Off Campus Housing', async () => {
  render(<FBPostPage />);
  const buttonOne = screen.getByRole('button', { name: /Off Campus/i });
  expect(buttonOne).toBeInTheDocument();

  await userEvent.click(buttonOne);
  await userEvent.click(buttonOne);
  expect(buttonOne).toHaveStyle('background-color: rgb(25, 118, 210)');

});
// test the presence of the text field for title
test('text field: content', async () => {
  render(<FBPostPage />);
  const contentField = screen.getByTestId('content');
  expect(contentField).toBeInTheDocument();
});

test('text field: title', () => {
  render(<FBPostPage />);
  const textbox = screen.getByTestId('title');
  expect(textbox).toBeInTheDocument();
});

test("click Dicussion radio option", () => {
  render(<FBPostPage />);
  const button = screen.getByRole("radio", { name: 'Discussion' });
  expect (button).toBeInTheDocument();

  fireEvent.click(button);
  expect(button).toBeChecked();
});

test("click Social radio option", () => {
  render(<FBPostPage />);
  const button = screen.getByRole("radio", { name: 'Social' });
  expect (button).toBeInTheDocument();

  fireEvent.click(button);
  expect(button).toBeChecked();
});



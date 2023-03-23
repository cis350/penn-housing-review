/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import FBMainFilter from '../components/FBMainFilter';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';

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

test("click On Campus radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'On Campus' });
    expect (button).toBeInTheDocument();
  
    fireEvent.click(button);
    expect(button).toBeChecked();
});

test("click Off Campus radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'Off Campus' });
    expect (button).toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toBeChecked();
});

test("click All Housing Types radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'All Housing Types' });
    expect (button).toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toBeChecked();
});

test("click All Housing Types + Social radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'All Housing Types' });
    expect (button).toBeInTheDocument();
    const buttonOther = screen.getByRole("radio", { name: 'Social' });
    
    fireEvent.click(button);
    fireEvent.click(buttonOther);
    expect(button).toBeChecked();
    expect(buttonOther).toBeChecked();
});

test("click All Housing Types + All categories radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'All Housing Types' });
    expect (button).toBeInTheDocument();
    const buttonOther = screen.getByRole("radio", { name: 'All Categories' });

    fireEvent.click(button);
    fireEvent.click(buttonOther);
    expect(button).toBeChecked();
    expect(buttonOther).toBeChecked();
});

test("click Discussion+Off Campus radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'Discussion' });
    expect (button).toBeInTheDocument();

    const buttonOther = screen.getByRole("radio", { name: 'Off Campus' });

    fireEvent.click(button);
    fireEvent.click(buttonOther);
    expect(button).toBeChecked();
    expect(buttonOther).toBeChecked();
});


test("click Social radio option", () => {
    render(<FBMainFilter />);
    const button = screen.getByRole("radio", { name: 'Social' });
    expect (button).toBeInTheDocument();
  
    fireEvent.click(button);
    expect(button).toBeChecked();
});
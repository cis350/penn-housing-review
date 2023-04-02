import React from 'react';
import { render, screen } from '@testing-library/react';
import FBPostList from '../components/FBPostList';

test('renders post list box', () => {
    render(<FBPostList />);
    const postListBox = screen.getByTestId('post-list-box');
    expect(postListBox).toBeInTheDocument();
    });

test('text: Like', () => {
    render(<FBPostList />);
    const commentButton = screen.getByTestId('comment-icon');
    expect(commentButton).toBeInTheDocument();
});
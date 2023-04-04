import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostList from '../components/FBPostList';

test ('renders post list', () => {
    render(<PostList />);
    const text = screen.getByTestId('postList');
    expect(text).toBeInTheDocument();
});

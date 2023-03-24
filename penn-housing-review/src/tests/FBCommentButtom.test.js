import React from 'react';
import { render, screen } from '@testing-library/react';
import FBCommentButtom from '../components/FBCommentButtom';

test('text: Like', () => {
    render(<FBCommentButtom />);
    const commentButton = screen.getByTestId('comment-icon');
    expect(commentButton).toBeInTheDocument();
});
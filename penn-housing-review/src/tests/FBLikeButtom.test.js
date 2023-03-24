import React from 'react';
import { render, screen } from '@testing-library/react';
import FBLikeButtom from '../components/FBLikeButtom';

test('text: Like', () => {
    render(<FBLikeButtom />);
    const LikeButton = screen.getByTestId('like-buttom-icon');
    expect(LikeButton).toBeInTheDocument();
});
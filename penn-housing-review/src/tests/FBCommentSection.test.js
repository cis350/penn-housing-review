import { render, screen } from '@testing-library/react';
import CommentSection from '../components/FBCommentSection';

test ('renders comment section', () => {
    render(<CommentSection />);
    const text = screen.getByTestId("post-button");
    expect(text).toBeInTheDocument();
});




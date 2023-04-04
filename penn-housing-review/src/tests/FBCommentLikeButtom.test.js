import { render, fireEvent } from '@testing-library/react';
import LikeButton from '../components/FBCommentLikeButtom';
import { updateCommentLike } from '../api/FBMainAPI';

jest.mock('../api/FBMainAPI', () => ({
  updateCommentLike: jest.fn(),
}));

describe('LikeButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<LikeButton likes={0} cid={1} />);
    expect(getByTestId('like-buttom-icon-1')).toBeInTheDocument();
  });

  it('updates likes on click', () => {
    const { getByTestId } = render(<LikeButton likes={0} cid={1} />);
    const likeButton = getByTestId('like-buttom-icon-1');

    fireEvent.click(likeButton);
    expect(likeButton).toHaveAttribute('data-testid', 'like-buttom-icon-1');

    fireEvent.click(likeButton);
    expect(likeButton).toHaveAttribute('data-testid', 'like-buttom-icon-1');
  });
});

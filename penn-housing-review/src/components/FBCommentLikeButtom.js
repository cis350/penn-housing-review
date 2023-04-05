import { React, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateCommentLike } from '../api/FBMainAPI';

export default function LikeButton({ likes, cid }) {
  const [selected, setSelected] = useState(false);
  const handleLike = () => {
    setSelected(!selected);
    if (!selected) {
      updateCommentLike(likes + 1, cid);
    } else {
      updateCommentLike(likes, cid);
    }
  };

  return (
    <div>
      <span className="postButtom">
        <a href="#" className="button" onClick={handleLike}>
          {!selected && (
            <FavoriteBorderIcon
              fontSize="medium"
              data-testid="like-buttom-icon-1"
            />
          )}
          {selected && (
            <FavoriteIcon fontSize="medium" data-testid="like-buttom-icon-2" />
          )}
        </a>
        {likes + selected}
      </span>
    </div>
  );
}

LikeButton.propTypes = {
  likes: PropTypes.number.isRequired,
  cid: PropTypes.number.isRequired,
};

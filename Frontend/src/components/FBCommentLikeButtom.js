import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { React, useState } from 'react';
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
        <a href="#" onClick={handleLike}>
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

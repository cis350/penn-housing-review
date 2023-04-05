import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updatePostLike } from '../api/FBMainAPI';

export default function LikeButton({ likes, pid }) {
  const [selected, setSelected] = useState(false);

  const handleLike = (event) => {
    setSelected(!selected);
    if (!selected) {
      console.log('selected');
      updatePostLike(likes + 1, pid);
    } else {
      console.log('not selected');
      updatePostLike(likes, pid);
    }
  };
  return (
    <div>
      <span className="postButtom">
        <span onClick={handleLike} id="clickableIcon">
          {!selected && (
            <FavoriteBorderIcon
              fontSize="medium"
              data-testid="like-buttom-icon"
            />
          )}
          {selected && (
            <FavoriteIcon fontSize="medium" data-testid="like-buttom-icon" />
          )}
        </span>
        &nbsp;
        {likes + selected}
      </span>
    </div>
  );
}

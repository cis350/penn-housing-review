import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateCommentLike } from '../api/FBMainAPI';
import { useState } from 'react';

export default function LikeButton( {likes, cid} ) {
    const [selected, setSelected] = useState(false);
    const handleLike = (event) => {
        setSelected(!selected);
        if (!selected) {
            updateCommentLike(likes + 1, cid);
        } else {
            updateCommentLike(likes, cid);
        }
        
    }

    return (
      <div>
        <span className='postButtom'>
          <a href="#" onClick={handleLike}>
            {!selected && (
            <FavoriteBorderIcon fontSize="medium" data-testid="like-buttom-icon"/>
            )}
            {selected && (
            <FavoriteIcon fontSize="medium" data-testid="like-buttom-icon"/>
            )}
          </a>
          {likes + selected}
        </span>
      </div>
    );
  }
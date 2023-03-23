import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { updateLike } from '../api/FBMainAPI';


export default function LikeButton( {likes, pid} ) {
    const [selected, setSelected] = useState(false);

    const handleLike = (event) => {
        setSelected(!selected);
        updateLike(likes, pid);
    }
    return (
        <div>
            <span className='postButtom'>
                <a href="#" onClick={handleLike}>
                    <FavoriteBorderIcon fontSize="medium" data-testid="like-buttom-icon"/>
                </a>
                &nbsp;
                {likes + selected}
            </span>
        </div>
    );
}



import './ReviewPage.css';
import * as React from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ToggleButton from '@mui/material/ToggleButton';
import { updateLike } from '../api/reviewapi';

export default function LikeButton( {id, username, ratings, likes, desc} ) {
    const [selected, setSelected] = React.useState(false);
    let handleChange = () => {
      setSelected(!selected);
      updateLike(1, id, username, ratings, likes + !selected, desc);
    }
    return (
        <ToggleButton className='like' value="check" selected={selected} onChange={handleChange}>
          <span className='like-num'>{likes + selected}</span>
          <ThumbUpIcon />
        </ToggleButton>
    )
  }
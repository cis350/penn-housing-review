import './ReviewPage.css';
import * as React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ToggleButton from '@mui/material/ToggleButton';
import { updateLike } from '../api/reviewapi';

export default function LikeButton({ id, likes }) {
  const [selected, setSelected] = React.useState(false);
  const handleChange = () => {
    setSelected(!selected);
    updateLike(
      id,
      selected ? likes - 1 : likes + 1,
    );
  };
  return (
    <ToggleButton
      className="like"
      value="check"
      selected={selected}
      onChange={handleChange}
    >
      <span className="like-num">{likes}</span>
      <ThumbUpIcon />
    </ToggleButton>
  );
}

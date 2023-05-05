/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PropTypes from 'prop-types';
import { followPost } from '../api/followPosts';


export default function LikeButton({ postId }) {
  const handleNotify = (event) => {
    event.preventDefault();
    followPost(postId, localStorage.getItem('username'));
  };

  return (
    <div>
      <span className="postButtom">
        <button type="button" href="#" onClick={handleNotify}>
          <NotificationsNoneIcon fontSize="medium" data-testid="notify-icon" />
        </button>
      </span>
    </div>
  );
}

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
};

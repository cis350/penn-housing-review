import { React, useState } from 'react';
import {
  Box,
  Divider,
  List,
  Pagination,
} from '@mui/material';
import propTypes from 'prop-types';
import CommentIcon from '@mui/icons-material/Comment';
import usePagination from '../utils/usePagination';
import LikeButtom from './FBPostLikeButton';
import NotifyButtom from './FBNotifyButtom';
import CommentSection from './FBCommentSection';

export default function PostList({ data }) {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(0);

  if (!data) {
    data = [];
  }

  const PER_PAGE = 4;

  const count = Math.ceil(data.length / PER_PAGE);
  const postData = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    postData.jump(p);
  };

  const handleComment = (pid) => {
    if (selectedPost === pid) {
      setSelectedPost(0);
    } else {
      setSelectedPost(pid);
    }
  };

  return (
    <Box p="5" data-testid="post-list-box">
      <List data-testid="postList">
        {postData.currentData().map((v) => (
          <div key={v._id}>
            <div className="postEntry">
              <h3>{v.title}</h3>
              <p>{v.content}</p>
              <div className="postEle">
                <LikeButtom likes={v.likes} pid={v._id} />
                <div>
                  <span className="postButtom">
                    <a href="#" onClick={() => handleComment(v._id)}>
                      <CommentIcon
                        fontSize="medium"
                        data-testid="comment-icon-1"
                      />
                    </a>
                  </span>
                </div>
                <NotifyButtom />
              </div>
            </div>
            {selectedPost === v._id && (
              <CommentSection comments={v.comments} pid={v._id} />
            )}
            <Divider className="postDiv" />
          </div>
        ))}
      </List>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
}

PostList.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string,
      title: propTypes.string,
      content: propTypes.string,
      likes: propTypes.number,
      comments: propTypes.number,
    }),
  ),
};

PostList.defaultProps = {
  data: [],
};

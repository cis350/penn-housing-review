import { useState } from "react";
import usePagination from '../utils/usePagination';
import { Box, List, Pagination } from "@mui/material";
import LikeButtom from './FBLikeButtom';
import CommentButtom from './FBCommentButtom';
import NotifyButtom from './FBNotifyButtom';

export default function PostList( {data} ) {
    let [page, setPage] = useState(1);
    const PER_PAGE = 2;

    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

    const handleComment = (event) => {
      event.preventDefault();
    }


    function PostEntry( {title, content, likes, comments, pid} ) { // add an ID field
        return (
          <div className='postEntry'>
            <h3>{title}</h3>
            <p>{content}</p>
            <div className='postEle'>
              <LikeButtom likes={likes} pid={pid} />
              <CommentButtom comments={comments} />
              <NotifyButtom />
            </div>        
            
            
          </div>
        )
    }


    return (
        <Box p="5">
          <List>
            {_DATA.currentData().map(v => {
              return (
                <PostEntry 
                    title={v.title} 
                    content={v.content} 
                    likes={v.likes} 
                    comments={v.comments}
                    pid={v.pid} />
                
              );
            })}
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
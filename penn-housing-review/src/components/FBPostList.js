import { useState } from "react";
import usePagination from '../utils/usePagination';
import { Box, List, Pagination } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function PostList( {data} ) {
    let [page, setPage] = useState(1);
    const PER_PAGE = 2;

    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    function LikeBottom( {likes} ) {
        return (
            <div className='likeBottom'>
              
            </div>
        )
    }


    function PostEntry( {title, content, likes, comments} ) { // add an ID field
        return (
          <div className='postEntry'>
            <h3>{title}</h3>
            <p>{content}</p>              
            <p>{likes}</p>
            
            <p>Comments: {comments.length}</p>
            
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
                    comments={v.comments} />
                
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
import './ReviewPage.css';
import * as React from "react";
import * as Mui from '@mui/material';

  function OverallReview( {ratings} ) {
    return (
      <div>
        <div className='ratingName'>
          <span className='ratingName'>Overall rating: </span>
          <br/>
          <span className='ratingName'>Price rating: </span>
          <br/>
          <span className='ratingName'>Security rating: </span>
        </div>
        <div className='ratings'>
          <Mui.Rating className="ratings" defaultValue={ratings[0]} precision={0.1} readOnly />
          <br/>
          <Mui.Rating className="ratings" defaultValue={ratings[1]} precision={0.1} readOnly />
          <br/>
          <Mui.Rating className="ratings" defaultValue={ratings[2]} precision={0.1} readOnly />
        </div>
      </div>
    )
  }

  export default function DescriptionView( {aptname, aptimg, aptratings, aptdesc} ) {
      return (
        <div className="description-view">
          <img className="aptimg" src={aptimg} alt="Apartment" />
          <h2 className='aptname'>{aptname}</h2>
          <span className='hl1'/>
          <OverallReview ratings={aptratings} />
          <span className='hl2'/>
          <p className='aptdesc'>{aptdesc}</p>
        </div>
      )
    }
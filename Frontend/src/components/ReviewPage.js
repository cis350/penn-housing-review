import './ReviewPage.css';
import * as React from "react";
import DescriptionView from "./DescriptionView";
import Header from "./Header";
import ReviewView from "./ReviewView";
import { getApartmentById } from '../api/reviewapi';

function ReviewPage() {
  const [reviews, setReviews] = React.useState({});
  React.useEffect(async()=>{
    const res = await getApartmentById('643dc668c494c0ddeef7e717');
    setReviews(res.data.data[0]);
  });
  console.log(reviews)
  
  return (
    <div className="container">
      <Header />
      <div className="main">
        <DescriptionView aptname={reviews.name} aptimg={reviews.image} 
        aptratings={reviews.ratings} aptdesc={reviews.description} />
        <span className='vl' />
        <ReviewView aptid='643dc668c494c0ddeef7e717' username='Olivia' />
      </div>
    </div>
  );
}


export default ReviewPage;
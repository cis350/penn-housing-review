import './ReviewPage.css';
import * as React from 'react';
import DescriptionView from './DescriptionView';
import Header from './Header';
import ReviewView from './ReviewView';
import { getApartmentById } from '../api/reviewapi';

function ReviewPage() {
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    getApartmentById(1).then((response) => setReviews(response.data));
    console.log(reviews.ratings);
  });

  return (
    <div className="container">
      <Header />
      <div className="main">
        <DescriptionView
          aptname={reviews.name}
          aptimg={reviews.image}
          aptratings={[3, 3, 3]}
          aptdesc={reviews.description}
        />
        <span className="vl" />
        <ReviewView aptid={1} />
      </div>
    </div>
  );
}

export default ReviewPage;

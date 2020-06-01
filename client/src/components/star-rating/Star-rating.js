import React from 'react';
import StarRatings from 'react-star-ratings';
import withStoreService from '../hoc';
import './Star-rating.css';
import { getFromLocalStorage } from '../../services/localStoreService';

const accessToken = getFromLocalStorage('accessToken');

const StarsRating = ({
  rating,
  id,
  userId,
  storeService,
  color,
  isSelectable,
  starSpacing = '0',
  starDimension = '25px',
  numberOfStars = 5
}) => {
  const changeRating = (rate) => {
    storeService.updateRate(id, userId, rate, accessToken);
  };

  const ratingChanging = (newRating) => {
    if (id && userId) {
      changeRating(newRating);
    }
  };
  return (
    <div className='star-rating' id='starRating' rating={rating}>
      <StarRatings
        rating={rating}
        changeRating={ratingChanging}
        starSpacing={starSpacing}
        numberOfStars={numberOfStars}
        starRatedColor={color}
        starDimension={starDimension}
        isSelectable={isSelectable}
      />
    </div>
  );
};

export default withStoreService()(StarsRating);

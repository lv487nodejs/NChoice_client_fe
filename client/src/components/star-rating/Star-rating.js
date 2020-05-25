import React from 'react';
import withStoreService from '../hoc';
import './Star-rating.css';
import { getFromLocalStorage } from '../../services/localStoreService';
import StarRatings from 'react-star-ratings';
const accessToken = getFromLocalStorage('accessToken');

const StarsRating = ({ rating, id, userId, storeService, color, isSelectable }) => {

    const changeRating = (rate)=>{
        storeService.updateRate(id, userId, rate, accessToken);
    }   

    const ratingChanging = (newRating) => {
        changeRating(newRating);
    }
    return (
        <div className="star-rating" id="starRating" rating={rating}>
            <StarRatings id="starRating" rating={rating} changeRating={ratingChanging} starSpacing="0" numberOfStars={5} starRatedColor={color} starDimension="25px" isSelectable={isSelectable} />
        </div>
    );
};




export default withStoreService()(StarsRating);
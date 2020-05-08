import React, { useState, useCallback } from 'react';
import withStoreService from '../hoc';
import './Star-rating.css';
import Rating from 'react-rating';
import { getFromLocalStorage } from '../../services/localStoreService';

const accessToken = getFromLocalStorage('accessToken');

const StarsRating = ({ rating, id, storeService }) => {
    const [rate, setRate] = useState(1);

    
    
    const ratingChanged = (newRating) => {
        setRate(newRating);  
        storeService.updateRate(id, rate, accessToken);
    }
    return (
        <div className="star-rating" id="starRating" rating={rating} >
            <Rating readonly={false} onChange={ratingChanged} id="stars" step={1} initialRating={rating} emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x" />
        </div>
    );
};



export default withStoreService()(StarsRating);
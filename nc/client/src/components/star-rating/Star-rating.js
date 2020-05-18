import React, { useCallback } from 'react';
import withStoreService from '../hoc';
import './Star-rating.css';
import Rating from 'react-rating';
import { getFromLocalStorage } from '../../services/localStoreService';
import { addRatingToStore } from '../../actions';
import { connect } from 'react-redux';

const accessToken = getFromLocalStorage('accessToken');

const StarsRating = ({ rating, id, storeService, addRatingToStore, rate }) => {
    
    const changeRating = useCallback(() => {
        storeService.updateRate(id, rate, accessToken);
    }, [id, rate, storeService]);    
    
    const ratingChanged = (newRating) => {
        addRatingToStore(newRating)
        changeRating();
    }
    return (
        <div className="star-rating" id="starRating" rating={rating} >
            <Rating readonly={false} onChange={ratingChanged} id="stars" step={1} initialRating={rating} emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x" />
        </div>
    );
};
const mapStateToProps = ({ ratingReducer: { rate } }) => ({ rate });

const mapDispatchToProps = {
    addRatingToStore
}



export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(StarsRating));
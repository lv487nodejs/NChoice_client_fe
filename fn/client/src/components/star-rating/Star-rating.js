import React from 'react';
import { connect } from 'react-redux';
import withStoreService from '../hoc';
import './Star-rating.css';
import Rating from 'react-rating';


const StarsRating = ({ rating }) => {
    const ratingChanged = (newRating) => {
      }   
    return (
        <div className="star-rating" id="starRating" rating={rating} >
            <Rating readonly={false} onChange={ratingChanged} id="stars" step={1} initialRating={rating} emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x" />
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(StarsRating));
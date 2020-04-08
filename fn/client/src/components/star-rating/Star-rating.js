import React from 'react';
import { connect } from 'react-redux';
import withStoreService from '../hoc';
import './Star-rating.css';
import Rating from 'react-rating';


const StarsRating = ({ rating }) => {

    return (
        <div className="star-rating" >
            <Rating readonly={true} step={1} initialRating={rating} emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x" />
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(StarsRating));
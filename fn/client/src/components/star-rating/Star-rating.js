import React from 'react';
import { connect } from 'react-redux';
import withStoreService from '../hoc';
import './Star-rating.css';
import Rating from 'react-rating';


let min = 1;
let max = 5;
let rating = min + (Math.random() * (max - min));

const StarRating = () => {

    return (
        <div className="star-rating" >
            <Rating readonly={true} step={1} initialRating={rating} />
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(StarRating));
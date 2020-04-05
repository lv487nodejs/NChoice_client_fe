import React from 'react';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import withStoreService from '../hoc';
import './Star-rating.css';


const rating = 3.45;
const StarRating = () => {

    return (
        <div className="star-rating" >
            <Rating name="half-rating-read" defaultValue={rating} precision={0.25} readOnly />
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(StarRating));
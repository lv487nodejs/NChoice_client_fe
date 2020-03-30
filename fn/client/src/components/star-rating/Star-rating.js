import React, { useState } from 'react';
import { connect } from 'react-redux';

import withStoreService from '../hoc';
import './Star-rating.css';

const COUNT = 5;
const Star = ({ selected = false, onClick = f => f }) => (
    <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars = COUNT }) => {
    const [starsSelected, selectStar] = useState(0);
    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={i < starsSelected}
                    onClick={() => selectStar(i + 1)}
                />
            ))}
            <p>
                {starsSelected} of {totalStars} stars
        </p>
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(StarRating));
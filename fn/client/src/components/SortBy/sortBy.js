import React from 'react';
import './sortBy.css';

const SortBy = () => {
    return (
        <div className="container sort-container">
            <a href="http://google.com" className="btn white black-text sort-panel">sort by price<i style={{ borderLeft: '1px solid black', padding: '0 0.5rem' }} className="material-icons right">arrow_upward</i></a>
            <a href="http://google.com" className="btn white black-text sort-panel">sort by rate<i style={{ borderLeft: '1px solid black', padding: '0 0.5rem' }} className="material-icons right">arrow_upward</i></a>
        </div>
    )
}
export default SortBy;
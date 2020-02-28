import React from 'react';
import './FilterItem.css';

export const FilterItem = props => {
    const { items = [], type, func } = props;
    console.log(type);

    const elements = items.map(item => (
        <li key={item[type]}>
            <label className="filter-list-item">
                <input type="checkbox" value={item[type]} onClick={e => func(e, e.target.value)} />
                {item[type]}
            </label>
        </li>
    ));
    return (
        <div className="filter-item">
            <p>
                <i className="btn btn-outline-primary plus-button">+</i>
            </p>
            <ul>{elements}</ul>
        </div>
    );
};

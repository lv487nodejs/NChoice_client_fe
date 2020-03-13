import React from 'react';
import './FilterItem.css';

export const FilterItem = props => {
    const { items = [], type, handler  } = props;
    const elements = items.map(item => (
        <li key={item[type]} >
            <label className="list-group-item">
                <input type="checkbox" value={item[type]} onClick={e => handler(e, e.target.value)} />
                {item[type]}
            </label>
        </li>
    ));
    return (
        <div className="filter-item">
            <p>
                <i className="btn btn-outline-primary plus-button">+</i>
            </p>
    <p className="filter-name">{type}</p>
            <ul>{elements}</ul>
        </div>
    );
};

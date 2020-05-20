import React from 'react';
import './Catalogs-list-item.css';

import { Link } from 'react-router-dom';

const CatalogsListItem = ({ catalog }) => (
    <Link to={`/catalogs/${catalog}`}>
        <div className="card__collection clear-fix">
            <div className="cards cards--two">
                <img src={`/images/catalogs/${catalog}.jpg`} alt={`${catalog} categories`} />
                <span className="cards--two__rect"></span>
                <span className="cards--two__tri"></span>
                <p className="catalogName">{`${catalog}`}</p>
            </div>
        </div>
    </Link>
);

export default CatalogsListItem;

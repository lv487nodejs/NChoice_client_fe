import React from 'react';
import './Catalogs-list-item.css';

import { Link } from 'react-router-dom';

const CatalogsListItem = ({ catalog }) => (
    <Link to={`/catalogs/${catalog}`}>
        <img src={`/images/catalogs/${catalog}.jpg`} alt={`${catalog} categories`} />
    </Link>
);

export default CatalogsListItem;

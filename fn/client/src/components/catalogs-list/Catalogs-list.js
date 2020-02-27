import React from 'react';
import './Catalogs-list.css';

import { Link } from 'react-router-dom';

const Catalogs = () => (
    <div className="catalogs">
        <Link to="/catalogs/men">
            <img src="/images/catalogs/men.jpg" alt="Men categories" />
        </Link>
        <Link to="/catalogs/women">
            <img src="/images/catalogs/women.jpg" alt="Women categories" />
        </Link>
        <Link to="/catalogs/kids">
            <img src="/images/catalogs/kid.jpg" alt="Kids categories" />
        </Link>
    </div>
);

export default Catalogs;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import StoreService from '../../services';

const NavCategories = ({ catalog }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storeService = new StoreService();
        storeService
            .getCatalogCategories(catalog)
            .then(response => {
                setProducts(response);
            })
            .catch(error => error);
    }, [catalog]);

    return (
        <ul>
            <li key="all" className="category-item">
                <Link to="/productlist">All Categories</Link>
            </li>
            {products.map(item => (
                <li key={item.id} className="category-item">
                    <Link to={item.category}>{item.category}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NavCategories;

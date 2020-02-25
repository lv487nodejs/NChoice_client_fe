import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CatalogService from '../../services/catalog'

const NavCategories = ({ catalog }) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const catalogService = new CatalogService();
        catalogService
            .getCatalogCategories(catalog)
            .then(response => {
                setProducts(response);
            })
            .catch(error => error);
    }, [catalog]);

    return (
        <ul>
            <li key='all' className="category-item">
                <Link to="/all">All Categories</Link>
            </li>
            {products.map(item => (
                
                
                <li key={item._id} className="category-item">
                    <Link to={item.category}>{item.category}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NavCategories;

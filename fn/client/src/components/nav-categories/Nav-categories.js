import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavCategories = ({ catalog }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://stark-headland-06017.herokuapp.com/catalogs?catalog=${catalog}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                setProducts(response[0].categories);
            })
            .catch(error => error);
    }, [catalog]);

    return (
        <ul>
            <li className="category-item">
                <Link to="/all">All Categories</Link>
            </li>
            {products.map(c => (
                <li className="category-item">
                    <Link to={c.category}>{c.category}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NavCategories;

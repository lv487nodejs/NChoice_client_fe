import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Сategory-items.css';
import CategoryCarousel from '../category-carousel';

export const CategoryItems = props => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://stark-headland-06017.herokuapp.com/catalogs?catalog=${props.catalogName}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                setProducts(response[0].categories);
            })
            .catch(error => console.log(error));
    }, [props, props.catalogName]);

    return (
        <div className="categories">
            <ul>
                <li className="category-item">
                    <Link to="/all">All</Link>
                </li>
                {products.map(c => (
                    <li className="category-item">
                        <Link to={c.category}>{c.category}</Link>
                    </li>
                ))}
            </ul>
            <CategoryCarousel image="categories.jpg" />
            <CategoryCarousel image="men.jpg" />
        </div>
    );
};

export default CategoryItems;

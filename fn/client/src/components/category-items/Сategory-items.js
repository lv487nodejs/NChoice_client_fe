import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Сategory-items.css';
import CategoryCarousel from '../category-carousel';

export const CategoryItems = props => {
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        console.log(CatalogService);
        const catalogs = await сatalogService.getCatalogByName(props.catalogName);
        setProducts(catalogs[0].categories)
    }, [props.catalogName]);

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

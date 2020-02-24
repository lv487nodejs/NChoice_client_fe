import React from 'react';

import './Сategory-items.css';
import CategoryCarousel from '../category-carousel';
import NavCategories from '../nav-categories';

const CategoryItems = ({ catalog }) => (
    <div className="categories">
        <NavCategories catalog={catalog} />
        <CategoryCarousel image={`${catalog}.jpg`} />
        <CategoryCarousel image={`${catalog}.jpg`} />
        <CategoryCarousel image={`${catalog}.jpg`} />
    </div>
);

export default CategoryItems;

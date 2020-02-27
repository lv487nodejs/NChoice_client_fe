import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { categoriesLoaded } from '../../actions';
import CategoriesNavItem from '../categories-nav-item';
import withStoreService from '../hoc';

const CategoriesNav = ({ storeService, categoriesLoaded, categories, catalog }) => {
    useEffect(() => {
        storeService.getCatalogCategories(catalog)
            .then(res => categoriesLoaded(res));
    }, [catalog]);

    return (
        <ul>
            <li key="all" className="category-item">
                <Link to="/productlist">All Categories</Link>
            </li>
            {categories.categories.map(category => (
                <li key={category.category} className="category-item">
                    <CategoriesNavItem name={category.category} />
                </li>
            ))}
        </ul>
    );
};

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = { categoriesLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(CategoriesNav));

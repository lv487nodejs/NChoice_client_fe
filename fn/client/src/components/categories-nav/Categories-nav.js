import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Categories-nav.css'

import { categoriesLoaded, categoriesRequested } from '../../actions';
import CategoriesNavItem from '../categories-nav-item';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';

const CategoriesNav = ({ storeService, categoriesLoaded, categoriesRequested, categories, catalog, loading }) => {
    useEffect(() => {
        categoriesRequested();
        storeService.getCatalogCategories(catalog).then(res => categoriesLoaded(res));
    }, [catalog, categoriesLoaded, categoriesRequested, storeService]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <ul className='categories-nav'>
            <li key="all" className="category-item">
                <Link to="/productlist">All Categories</Link>
            </li>
            {categories.map(category => (
                <li key={category.category} className="category-item">
                    <CategoriesNavItem name={category.category} />
                </li>
            ))}
        </ul>
    );
};

const mapStateToProps = ({ categoriesList: { categories, loading } }) => ({ categories, loading });
const mapDispatchToProps = { categoriesLoaded, categoriesRequested };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(CategoriesNav));

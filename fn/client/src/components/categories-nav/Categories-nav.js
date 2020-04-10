import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Categories-nav.css';

import {
  categoriesLoaded,
  categoriesRequested,
  filterAddCategories,
  filterRemoveAllCategories,
  filterRemoveAllColors,
  filterRemoveAllBrands
} from '../../actions';
import CategoriesNavItem from '../categories-nav-item';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';
import { PRODUCT_LIST_URL } from '../../configs/frontend-config';
const CategoriesNav = ({
  cartAndStoreService:{storeService},
  categoriesLoaded,
  categoriesRequested,
  categories,
  catalog,
  loading,
  filterAddCategories,
  filterRemoveAllCategories,
  filterRemoveAllBrands,
  filterRemoveAllColors,
}) => {
  useEffect(() => {
    categoriesRequested();
    storeService
      .getCatalogCategories(catalog)
      .then((res) => categoriesLoaded(res));
  }, [catalog, categoriesLoaded, categoriesRequested, storeService]);

  const filterAddCategoriesHandler = (item) => {
    filterRemoveAllBrands();
    filterRemoveAllColors();
    filterRemoveAllCategories();
    filterAddCategories(item);
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ul className="categories-nav">
      <li key="all" className="category-item">
        <Link
          to={PRODUCT_LIST_URL + catalog}
          onClick={() => filterRemoveAllCategories()}
        >
          All Categories
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.category} className="category-item">
          <CategoriesNavItem
            handler={filterAddCategoriesHandler}
            catalog={catalog}
            name={category.category}
            config={PRODUCT_LIST_URL}
          />
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ categoriesList: { categories, loading } }) => ({
  categories,
  loading,
});
const mapDispatchToProps = {
  categoriesLoaded,
  categoriesRequested,
  filterAddCategories,
  filterRemoveAllCategories,
  filterRemoveAllColors,
  filterRemoveAllBrands,
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CategoriesNav)
);

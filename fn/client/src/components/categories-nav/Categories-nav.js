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
  filterRemoveAllBrands,
  setCatalogFilter
} from '../../actions';
import CategoriesNavItem from '../categories-nav-item';
import withStoreService from '../hoc';
import { PRODUCT_LIST_URL } from '../../configs/frontend-config';
const CategoriesNav = ({
  storeService,
  categoriesLoaded,
  categoriesRequested,
  categories,
  catalog,
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

  const filterRemoveCategoriesHandler = () => {
   filterRemoveAllCategories()
  };

  const items = categories.map((category) => (
    <li key={category.category} className="category-item">
      <CategoriesNavItem
        handler={filterAddCategoriesHandler}
        catalog={catalog}
        name={category.category}
        config={PRODUCT_LIST_URL}
      />
    </li>
  ));
  window.scrollTo(0,0)
  return (
    <ul className="categories-nav">
      <li key="all" className="category-item">
        <Link
          to={PRODUCT_LIST_URL + catalog}
          onClick={filterRemoveCategoriesHandler}
        >
          All Categories
        </Link>
      </li>
      {items}
    </ul>
  );
};

const mapStateToProps = ({ categoriesList: { categories } }) => ({ categories });
const mapDispatchToProps = {
  categoriesLoaded,
  categoriesRequested,
  filterAddCategories,
  filterRemoveAllCategories,
  filterRemoveAllColors,
  filterRemoveAllBrands,
  setCatalogFilter
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CategoriesNav)
);

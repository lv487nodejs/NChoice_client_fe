import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  filterAddBrand,
  filterAddColor,
  filterAddCategory,
  filterRemoveColor,
  filterRemoveCategory,
  filterRemoveBrand,
  productsLoaded,
  addPagesCount,
} from '../../actions';

import FilterItem from '../filterItem';
import withStoreService from '../hoc';

import './filter.css';

const Filter = ({
  storeService,
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
  brand,
  category,
  color,
  catalog,
  productsLoaded,
  currentPage,
  postsPerPage,
  addPagesCount,
  sortByPrice,
  searchTerm,
}) => {
  const [getBrands, setBrands] = useState([]);
  const [getCategories, setCategories] = useState([]);
  const [getColors, setColors] = useState([]);

  useEffect(() => {
    storeService
      .getAllBrands()
      .then((response) => setBrands(response))
      .catch((err) => console.log(err));
  }, [storeService]);

  useEffect(() => {
    storeService
      .getCatalogCategories(catalog)
      .then((response) => setCategories(response))
      .catch((err) => console.log(err));
  }, [catalog, storeService]);
  useEffect(() => {
    storeService
      .getAllColors()
      .then((response) => setColors(response))
      .catch((err) => console.log(err));
  }, [storeService]);

  useEffect(() => {
    storeService
      .getProductsByFilter({
        catalog,
        brand,
        color,
        category,
        currentPage,
        postsPerPage,
        sortByPrice,
        searchTerm,
      })
      .then((res) => {
        productsLoaded(res.products);
        addPagesCount(res.pagesCount);
      });
  }, [
    brand,
    category,
    catalog,
    color,
    storeService,
    productsLoaded,
    currentPage,
    postsPerPage,
    addPagesCount,
    sortByPrice,
    searchTerm,
  ]);
  const filterAddBrandHandler = (e, item) => {
    if (e.target.checked) {
      filterAddBrand(item);
    } else {
      filterRemoveBrand(item);
    }
  };
  const filterAddCategoryHandler = (e, item) => {
    if (e.target.checked) {
      filterAddCategory(item);
    } else {
      filterRemoveCategory(item);
    }
  };
  const filterAddColorHandler = (e, item) => {
    if (e.target.checked) {
      filterAddColor(item);
    } else {
      filterRemoveColor(item);
    }
  };

  const filterOptions = [
    {
      items: getBrands,
      type: 'brand',
      handler: filterAddBrandHandler,
    },
    {
      items: getCategories,
      type: 'category',
      handler: filterAddCategoryHandler,
    },
    {
      items: getColors,
      type: 'color',
      handler: filterAddColorHandler,
    },
  ]

  return (
    <div className="filter-group">
      <span>Filter</span>
      {
        filterOptions.map(({ items, type, handler }) => {
          return <FilterItem
          key={type}
            items={items}
            type={type}
            handler={handler}
          />
        })
      }
    </div>
  );
};
const mapStateToProps = ({
  productsList: { currentPage, postsPerPage, sortByPrice },
  filter: { brand, category, color, searchTerm },
  catalogsList: { catalog },
}) => ({
  brand,
  category,
  color,
  catalog,
  currentPage,
  postsPerPage,
  sortByPrice,
  searchTerm,
});

const mapDispatchToProps = {
  filterAddBrand,
  filterAddColor,
  filterAddCategory,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
  productsLoaded,
  addPagesCount,
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Filter)
);

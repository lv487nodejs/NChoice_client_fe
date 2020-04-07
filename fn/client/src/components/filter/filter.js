import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  filterAddBrand,
  filterAddColor,
  filterAddCategory,
  filterRemoveColor,
  filterRemoveCategory,
  filterRemoveBrand,
  setProducts,
  addPagesCount,
  catalogLoaded,
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
  catalogLoaded,
  catalog,
}) => {
  const [getBrands, setBrands] = useState([]);
  const [getCategories, setCategories] = useState([]);
  const [getColors, setColors] = useState([]);

  useEffect(() => {
    storeService
      .getAllBrands()
      .then((response) => setBrands(response))
      .catch((err) => console.log(err));

    storeService
      .getCatalogCategories(catalog)
      .then((response) => {
        setCategories(response)
      })
      .catch((err) => console.log(err));

    storeService
      .getAllColors()
      .then((response) => setColors(response))
      .catch((err) => console.log(err));

  }, [catalogLoaded]);

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

  return (
    <div className="filter-group">
      <span>Filter</span>
      <FilterItem
        items={getBrands}
        type="brand"
        handler={filterAddBrandHandler}
      />
      <FilterItem
        items={getCategories}
        type="category"
        handler={filterAddCategoryHandler}
      />
      <FilterItem
        items={getColors}
        type="color"
        handler={filterAddColorHandler}
      />
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

const mapDispatchToProps = (dispatch) => ({
  filterAddBrand: (brand) => dispatch(filterAddBrand(brand)),
  filterAddColor: (color) => dispatch(filterAddColor(color)),
  filterAddCategory: (category) => dispatch(filterAddCategory(category)),
  filterRemoveBrand: (brand) => dispatch(filterRemoveBrand(brand)),
  filterRemoveCategory: (category) => dispatch(filterRemoveCategory(category)),
  filterRemoveColor: (category) => dispatch(filterRemoveColor(category)),
  setProducts: (products) => dispatch(setProducts(products)),
  addPagesCount: (value) => dispatch(addPagesCount(value)),
  catalogLoaded: (value) => dispatch(catalogLoaded(value)),
});

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Filter)
);

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  filterAddBrand,
  filterAddColor,
  filterAddCategories,
  filterRemoveColor,
  filterRemoveCategory,
  filterRemoveBrand,
} from '../../actions';

import FilterItem from '../filterItem';
import withStoreService from '../hoc';

import './filter.css';

const Filter = ({
  storeService,
  filterAddBrand,
  filterAddCategories,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
  catalogLoaded,
  catalogFilter,
  match
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
      .getAllColors()
      .then((response) => setColors(response))
      .catch((err) => console.log(err));

  }, [catalogLoaded, storeService]);

  useEffect(() => {
    const catalog = match.params.name
    storeService
      .getCatalogCategories(catalog)
      .then((response) => {
        setCategories(response)
      })
      .catch((err) => console.log(err));
  }, [storeService, match.params.name]);



  const filterAddBrandHandler = (e, item) => {
    if (e.target.checked) {
      filterAddBrand(item);
    } else {
      filterRemoveBrand(item);
    }
  };
  const filterAddCategoriesHandler = (e, item) => {
    if (e.target.checked) {
      filterAddCategories(item);
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
      handler: filterAddCategoriesHandler,
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
const mapStateToProps = ({ filter: { catalogFilter } }) => ({
  catalogFilter
})

const mapDispatchToProps = {
  filterAddBrand,
  filterAddColor,
  filterAddCategories,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
);

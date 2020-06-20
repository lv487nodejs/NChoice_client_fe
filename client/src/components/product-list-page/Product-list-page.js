import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list-page.css';
import { Button } from 'react-bootstrap';
import ProductList from '../product-list';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import Filter from '../filter';

import SearchBar from '../search-bar/search-bar';
import {
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  setCatalogFilter,
  clearFilter
} from '../../actions';
import withStoreService from '../hoc';
import ProductSort from '../product-sort';

const sortAsc = 0;

const classNameSelector = (value) => {
  switch (value) {
  case 0: {
    return 'fa fa-sort';
  }
  case 1: {
    return 'fa fa-sort-asc';
  }
  case -1: {
    return 'fa fa-sort-desc';
  }
  default:
    return 0;
  }
};

const ProductListPage = ({
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  pagesCount,
  setCatalogFilter,
  catalog,
  clearFilter,
  sortByPrice,
  sortByRate
}) => {
  const priceButtonClassName = classNameSelector(sortByPrice);
  const rateButtonClassName = classNameSelector(sortByRate);
  const sortByPriceHandler = (value) => {
    addSortByRate(0);
    addSortByPrice(value);
  };
  const sortByRateHandler = (value) => {
    addSortByPrice(0);
    addSortByRate(value);
  };
  const clearAllHandler = () => {
    clearFilter();
  };
  const sortOptions = [
    {
      text: 'PRICE',
      value: sortAsc,
      handler: sortByPriceHandler,
      variant: 'dark',
      className: priceButtonClassName
    },
    {
      text: 'RATE',
      value: sortAsc,
      handler: sortByRateHandler,
      variant: 'dark',
      className: rateButtonClassName
    }
  ];

  useEffect(() => {
    catalogLoaded(catalog);
    setCatalogFilter(catalog);
    if (sessionStorage.getItem('postPerPage') !== null) {
      addPostsPerPage(sessionStorage.getItem('postPerPage'));
    }
  }, [addPostsPerPage, catalog, catalogLoaded, setCatalogFilter]);

  const paginateMethod = (value) => addCurrentPage(value - 1);

  const changeItemsMethod = (number) => {
    addPostsPerPage(number);
    sessionStorage.setItem('postPerPage', number);
  };

  const changePagination = () => addCurrentPage(0);
  const sortButtons = sortOptions.map((item) => (
    <ProductSort key={item.text} options={item} />
  ));
  return (
    <div>
      <h2 className='catalog-top-name'>{catalog} Catalog</h2>
      <div className='products-options'>
        <div className='search-wrapp'>
          <SearchBar />
          <Button
            type='button'
            className='clear-button'
            variant='dark'
            onClick={clearAllHandler}
          >
            CLEAR FILTERS
          </Button>
        </div>
        <div className='sort-wrapp'>
          <div className='sort-buttons'>
            <h5>SORT BY:</h5>
            {sortButtons}
          </div>
          <ProductListButtonPages
            changeItems={changeItemsMethod}
            changeCurrentPage={changePagination}
            className='buttonsGroup productListButtons '
          />
        </div>
      </div>
      <div className='product-list-page'>
        <div className='filters'>
          <Filter />
        </div>
        <ProductList />
      </div>
      <ProductListPaginator
        pagesCount={pagesCount}
        paginate={paginateMethod}
        className='paginator'
      />
    </div>
  );
};

const mapStateToProps = ({
  productsList: { pagesCount, sortByPrice, sortByRate }
}) => ({ pagesCount, sortByPrice, sortByRate });

const mapDispatchToProps = {
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  setCatalogFilter,
  clearFilter
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
);

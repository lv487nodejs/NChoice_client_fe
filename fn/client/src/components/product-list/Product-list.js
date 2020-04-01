import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import Filter from '../filter';

import SearchBar from '../search-bar/search-bar';
import {
  productsLoaded,
  productsRequested,
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRating
} from '../../actions';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';
import ProductSort from '../product-sort';

const sortAsc = 1;

const ProductList = ({
  storeService,
  productsLoaded,
  productsRequested,
  catalogLoaded,
  products,
  loading,
  catalog,
  addPostsPerPage,
  addCurrentPage,
  pagesCount,
  addSortByPrice,
  addSortByRating
}) => {
  const sortOptions = [
    {
      text: 'sort by price',
      value: sortAsc,
      handler: addSortByPrice,
      variant: 'dark',
      defaultClass: 'fas fa-sort-up',
      toChangeClass: 'fas fa-sort-down',
    }, {
      text: 'sort by rating',
      value: sortAsc,
      handler: addSortByRating,
      variant: 'dark',
      defaultClass: 'fas fa-sort-up',
      toChangeClass: 'fas fa-sort-down'
    }
  ];

  useEffect(() => {
    productsRequested();
    catalogLoaded(catalog);
    storeService
      .getProductsByFilter({ catalog })
      .then((res) => productsLoaded(res.products));
    if (sessionStorage.getItem('postPerPage') !== null) {
      addPostsPerPage(sessionStorage.getItem('postPerPage'));
    }
  }, [
    productsLoaded,
    productsRequested,
    storeService,
    catalog,
    catalogLoaded,
    addPostsPerPage,
  ]);

  // Change view
  const paginateMethod = (value) => addCurrentPage(value);
  const changeItemsMethod = (number) => {
    addPostsPerPage(number);
    sessionStorage.setItem('postPerPage', number);
  };
  const changePagination = () => addCurrentPage(1);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="catalog-top-name">{catalog} Catalog</h2>
      <div className="product-list-page">
        <div className="products-options">
          <SearchBar />
          {sortOptions.map(({ value, variant, defaultClass, toChangeClass, handler, text }) => {
            return  <ProductSort value={value} defaultClass={defaultClass} toChangeClass={toChangeClass} variant={variant} text={text} handler={handler} />

          })}

          <ProductListButtonPages
            changeItems={changeItemsMethod}
            changeCurrentPage={changePagination}
            className="buttonsGroup productListButtons "
          />
        </div>
        <div className="filters">
          <Filter />
        </div>
        <ProductListPosts products={products} />
      </div>
      <ProductListPaginator
        pagesCount={pagesCount}
        paginate={paginateMethod}
        className="paginator"
      />
    </div>
  );
};

const mapStateToProps = ({
  productsList: { products, loading, pagesCount },
}) => ({ products, loading, pagesCount });
const mapDispatchToProps = {
  productsLoaded,
  productsRequested,
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRating
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);

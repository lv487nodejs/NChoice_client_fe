import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list-page.css';
import ProductList from '../product-list';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import Filter from '../filter';

import SearchBar from '../search-bar/search-bar';
import {
  setProducts,
  productsLoadingStart,
  productsLoadingStop,
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addPagesCount,
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
} from '../../actions';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';
import ProductSort from '../product-sort';

const sortAsc = 1;

const ProductListPage = ({
  storeService,
  setProducts,
  productsLoadingStart,
  productsLoadingStop,
  catalogLoaded,
  products,
  loading,
  addPostsPerPage,
  addCurrentPage,
  pagesCount,
  addSortByPrice,
  brand,
  category,
  catalog,
  color,
  currentPage,
  postsPerPage,
  addPagesCount,
  sortByPrice,
  searchTerm,
}) => {
  const sortOptions = [
    {
      text: 'sort by price',
      value: sortAsc,
      handler: addSortByPrice,
      variant: 'dark',
      defaultClass: 'fas fa-sort-up',
      toChangeClass: 'fas fa-sort-down',
    },
  ];

  useEffect(() => {
    catalogLoaded(catalog);
    if (sessionStorage.getItem('postPerPage') !== null) {
      addPostsPerPage(sessionStorage.getItem('postPerPage'));
    }
  }, [
    setProducts,
    productsLoadingStart,
    productsLoadingStop,
    catalogLoaded,
  ]);

  // Change view
  const paginateMethod = (value) => addCurrentPage(value - 1);
  const changeItemsMethod = (number) => {
    addPostsPerPage(number);
    sessionStorage.setItem('postPerPage', number);
  };

  const changePagination = () => addCurrentPage(1);

  return (
    <div>
      <h2 className="catalog-top-name">{catalog} Catalog</h2>
      <div className="product-list-page">
        <div className="products-options">
          <SearchBar />
          <ProductSort options={sortOptions} />

          <ProductListButtonPages
            changeItems={changeItemsMethod}
            changeCurrentPage={changePagination}
            className="buttonsGroup productListButtons "
          />
        </div>
        <div className="filters">
          <Filter />
        </div>
        <ProductList />
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
  filter: { brand, category, color, searchTerm },
}) => ({ products, loading, pagesCount, brand, category, color, searchTerm });
const mapDispatchToProps = {
  setProducts,
  productsLoadingStart,
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addPagesCount,
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
  productsLoadingStop,
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
);

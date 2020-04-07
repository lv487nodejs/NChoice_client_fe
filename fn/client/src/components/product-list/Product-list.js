import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProductsListItem from '../product-list-item';
import './Product-list.css';
import withStoreService from '../hoc';

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
  categoriesLoaded,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
  setCatalogFilter,
} from '../../actions';

const ProductList = ({
  products,
  storeService,
  setProducts,
  productsLoadingStart,
  catalogLoaded,
  addPostsPerPage,
  addCurrentPage,
  categoriesLoaded,
  brand,
  category,
  catalog,
  color,
  currentPage,
  postsPerPage,
  addPagesCount,
  sortByPrice,
  catalogFilter,
  productsLoadingStop,
  searchTerm,
}) => {

  useEffect(() => {
    catalogLoaded(catalog)
    setCatalogFilter(catalog)
    storeService
      .getProductsByFilter({
        catalog: catalogFilter,
        brand,
        color,
        category,
        currentPage,
        postsPerPage,
        sortByPrice,
        searchTerm,
      })
      .then((res) => {
        setProducts(res.products);
        addPagesCount(res.pagesCount);
        productsLoadingStop();
      });
    if (sessionStorage.getItem('postPerPage') !== null) {
      addPostsPerPage(sessionStorage.getItem('postPerPage'));
    }
  }, [
    setProducts,
    productsLoadingStart,
    productsLoadingStop,
    storeService,
    addPostsPerPage,
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveBrand,
    filterRemoveCategory,
    filterRemoveColor,
    categoriesLoaded,
    addPagesCount,
    addCurrentPage,
    searchTerm,
    setCatalogFilter,
    catalogLoaded,
    catalogFilter,
    category,
    brand,
    color,
    currentPage,
    postsPerPage,
    sortByPrice,
  ]);

  return (
    <div className="products-items">
      {products.map(({ id, title, description, images, price, mrsp }) => (
        <ProductsListItem
          title={title}
          description={description}
          images={images}
          price={price}
          mrsp={mrsp}
          id={id}
          key={id}
        />
      ))}
    </div>
  );
}

const mapStateToProps = ({
  catalogsList: { catalog },
  productsList: { products, currentPage, postsPerPage, sortByPrice },
  filter: { brand, category, color, searchTerm, catalogFilter },

}) => ({ products, catalog, brand, category, color, searchTerm, catalogFilter, currentPage, postsPerPage, sortByPrice });

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
  categoriesLoaded,
  setCatalogFilter,
  productsLoadingStop,
};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

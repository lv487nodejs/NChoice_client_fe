import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProductsListItem from '../product-list-item';
import './Product-list.css';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';

import {
  setProducts,
  productsLoadingStart,
  productsLoadingStop,
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  addPagesCount,
  filterAddBrand,
  filterAddCategories,
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
  brand,
  category,
  color,
  loading,
  currentPage,
  postsPerPage,
  addPagesCount,
  sortByPrice,
  sortByRate,
  catalogFilter,
  productsLoadingStart,
  searchTerm,
}) => {


  useEffect(() => {
    productsLoadingStart()
    storeService
      .getProductsByFilter({
        catalog: catalogFilter,
        brand,
        color,
        category,
        currentPage,
        postsPerPage,
        sortByPrice,
        sortByRate,
        searchTerm,
      })
      .then((res) => {
          setProducts(res.products);
          addPagesCount(res.pagesCount);
      }).catch((error) => {
        setProducts([]);
      });
  }, [
    catalogFilter,
    setProducts,
    productsLoadingStart,
    storeService,
    addPagesCount,
    searchTerm,
    category,
    brand,
    color,
    currentPage,
    postsPerPage,
    sortByPrice,
    sortByRate
  ]);

  if (loading) {
    return <LoadingSpinner />
  }

  if (!products.length) {
    return <h2>No products found</h2>
  }

  return (
    <div className="products-items">
      {products.map(({ id, title, description, images, price, mrsp, rate }) => (
        <ProductsListItem
          title={title}
          description={description}
          images={images}
          price={price}
          mrsp={mrsp}
          id={id}
          key={id}
          rate={rate}
        />
      ))}
    </div>
  );
}

const mapStateToProps = ({
  catalogsList: { catalog },
  productsList: { products, currentPage, postsPerPage, sortByPrice, sortByRate, loading },
  filter: { brand, category, color, searchTerm, catalogFilter },

}) => ({ products, loading, catalog, brand, category, color, searchTerm, catalogFilter, currentPage, postsPerPage, sortByPrice, sortByRate });

const mapDispatchToProps = {
  setProducts,
  productsLoadingStart,
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  addPagesCount,
  filterAddBrand,
  filterAddCategories,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveColor,
  categoriesLoaded,
  setCatalogFilter,
  productsLoadingStop,
};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Product-list-page.css";
import ProductList from "../product-list";
import ProductListPaginator from "../product-list-paginator";
import ProductListButtonPages from "../product-list-button-pages";
import Filter from "../filter";

import SearchBar from "../search-bar/search-bar";
import {
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  setCatalogFilter,
  clearFilter
} from "../../actions";
import withStoreService from "../hoc";
import ProductSort from "../product-sort";
import { Button } from "react-bootstrap";

const sortAsc = 1;

const ProductListPage = ({
  catalogLoaded,
  addCurrentPage,
  addPostsPerPage,
  addSortByPrice,
  addSortByRate,
  pagesCount,
  setCatalogFilter,
  catalog,
  clearFilter
}) => {

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
  const sortOptions = [{
    text: "PRICE",
    value: sortAsc,
    handler: sortByPriceHandler,
    variant: "dark",
    defaultClass: "fas fa-sort-up",
    toChangeClass: "fas fa-sort-down"
  },
  {
    text: "RATE",
    value: sortAsc,
    handler: sortByRateHandler,
    variant: "dark",
    defaultClass: "fas fa-sort-up",
    toChangeClass: "fas fa-sort-down"
  }];

  useEffect(() => {
    catalogLoaded(catalog);
    setCatalogFilter(catalog);
    if (sessionStorage.getItem("postPerPage") !== null) {
      addPostsPerPage(sessionStorage.getItem("postPerPage"));
    }
  }, [
    addPostsPerPage,
    catalog,
    catalogLoaded,
    setCatalogFilter
  ]);

  // Change view
  const paginateMethod = (value) => addCurrentPage(value - 1);

  const changeItemsMethod = (number) => {
    addPostsPerPage(number);
    sessionStorage.setItem("postPerPage", number);
  };

  const changePagination = () => addCurrentPage(0);
  const sortButtons = sortOptions.map((item) => {
    return <ProductSort key={item.text} options={item} />;
  });
  return (
    <div>
      <h2 className="catalog-top-name">{catalog} Catalog</h2>
      <div className="products-options">
        <div className='search-wrapp'>
          <SearchBar />
          <Button className="clear-button" variant="dark" onClick={clearAllHandler}>CLEAR FILTERS</Button>
        </div>
        <div className='sort-wrapp'>
          <div className="sort-buttons">
            <h5>SORT BY:</h5>{sortButtons}
          </div>
          <ProductListButtonPages
            changeItems={changeItemsMethod}
            changeCurrentPage={changePagination}
            className="buttonsGroup productListButtons "
          />
        </div>
      </div>
      <div className="product-list-page">
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
  productsList: { pagesCount }
}) => ({ pagesCount });
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

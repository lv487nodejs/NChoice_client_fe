import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import Filter from '../filter';
import CartTable from '../cart-table';

import SearchBar from '../search-bar/search-bar';
import {
    productsLoaded,
    productsRequested,
    catalogLoaded,
    addCurrentPage,
    addPagesCount,
    addPostsPerPage,
    addSort,
} from '../../actions';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';
import ProductSort from '../product-sort';

const ProductList = ({
    storeService,
    productsLoaded,
    productsRequested,
    catalogLoaded,
    products,
    loading,
    catalog,
    addCurrentPage,
    addPagesCount,
    addPostsPerPage,
    postsPerPage,
    currentPage,
    addSort,
}) => {
    console.log(products);

    useEffect(() => {
        productsRequested();
        catalogLoaded(catalog);
        storeService.getProductsByFilter({ catalog, postsPerPage, currentPage }).then(res => {
            productsLoaded(res.products);
            addPagesCount(res.pagesCount);
        });
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
        addPagesCount,
        postsPerPage,
        currentPage,
    ]);

    // Change view
    const paginateMethod = value => addCurrentPage(value);
    const changeItemsMethod = number => {
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
                    <ProductSort value={1} sortBy={'asc'} addSort={addSort} />
                    <ProductSort value={-1} sortBy={'desc'}  addSort={addSort}/>
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
            <CartTable />
            <ProductListPaginator paginate={paginateMethod} className="paginator" />
        </div>
    );
};

const mapStateToProps = ({
    productsList: { products, loading, currentPage, postsPerPage },
    filter: { brand, color, category },
}) => ({ products, loading, brand, color, category, currentPage, postsPerPage });

const mapDispatchToProps = {
    productsLoaded,
    productsRequested,
    catalogLoaded,
    addCurrentPage,
    addPagesCount,
    addPostsPerPage,
    addSort,
};

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

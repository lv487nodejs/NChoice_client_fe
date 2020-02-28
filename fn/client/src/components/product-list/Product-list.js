import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import Filter from '../filter';

import SearchBar from '../search-bar/search-bar';
import { productsLoaded, productsRequested } from '../../actions';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';
import ProductSort from '../product-sort';

const ProductList = ({ storeService, productsLoaded, productsRequested, products, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);

    useEffect(() => {
        productsRequested();
        storeService.getAllProducts().then(res => productsLoaded(res));
    }, [productsLoaded, productsRequested, storeService]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

    // Change view
    const paginateMethod = value => setCurrentPage(value);
    const changeItemsMethod = number => setPostsPerPage(number);
    const changePagination = () => setCurrentPage(1);

    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="productListPage">
            <div className="sortField">
                <SearchBar className="searchField" />
                <ProductSort arrayToSort={currentPosts} />
                <ProductSort arrayToSort={currentPosts} />
            </div>

            <div className="filters">
                {/* <Filter /> */}
            </div>
            <div className="list">
                <ProductListButtonPages
                    changeItems={changeItemsMethod}
                    changeCurrentPage={changePagination}
                    className="buttonsGroup productListButtons "
                />
                <ProductListPosts products={currentPosts} className="productList" />
                <ProductListPaginator
                    postPerPage={postsPerPage}
                    totalPosts={products.length}
                    paginate={paginateMethod}
                    className="paginator"
                />
            </div>
        </div>
    );
};

const mapStateToProps = ({ productsList: { products, loading } }) => ({ products, loading });
const mapDispatchToProps = { productsLoaded, productsRequested };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

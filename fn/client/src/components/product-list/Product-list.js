import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import Filter from '../filter';

import SearchBar from '../search-bar/search-bar';
import { productsLoaded, productsRequested, catalogLoaded } from '../../actions';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';
import ProductSort from '../product-sort';

const ProductList = ({ storeService, productsLoaded, productsRequested, catalogLoaded, products, loading, catalog, currency }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);



    useEffect(() => {
        productsRequested();
        catalogLoaded(catalog);
        storeService.getProductsByFilter({ catalog: catalog })
            .then(res => productsLoaded(res));
        if (sessionStorage.getItem("postPerPage") !== null) {
            setPostsPerPage(sessionStorage.getItem("postPerPage"))
        }
    }, [productsLoaded, productsRequested, storeService, catalog, catalogLoaded]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

    // Change view
    const paginateMethod = value => setCurrentPage(value);
    const changeItemsMethod = number => {
        setPostsPerPage(number);
        sessionStorage.setItem("postPerPage", number);
    };
    const changePagination = () => setCurrentPage(1);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h2 className="catalog-top-name">{catalog} Catalog</h2>
            <div className="product-list-page">
                <div className="products-options">
                    <SearchBar />
                    <ProductSort arrayToSort={currentPosts} />
                    <ProductSort arrayToSort={currentPosts} />
                    <ProductListButtonPages
                        changeItems={changeItemsMethod}
                        changeCurrentPage={changePagination}
                        className="buttonsGroup productListButtons "
                    />
                </div>
                <div className="filters">
                    <Filter />
                </div>
                <ProductListPosts products={currentPosts} />
            </div>
            <ProductListPaginator
                postPerPage={postsPerPage}
                totalPosts={products.length}
                paginate={paginateMethod}
                className="paginator"
            />
        </div>
    );
};

const mapStateToProps = ({ productsList: { products, loading, currency } }) => ({ products, loading, currency });
const mapDispatchToProps = { productsLoaded, productsRequested, catalogLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

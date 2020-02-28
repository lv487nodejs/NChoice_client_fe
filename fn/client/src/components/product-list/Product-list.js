import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';

import { productsLoaded, productsRequested } from '../../actions';
import withStoreService from '../hoc';
import LoadingSpinner from '../Loading-spinner';


const ProductList = ({ storeService, productsLoaded, productsRequested, products, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);

    useEffect(() => {
        productsRequested()
        storeService.getAllProducts()
            .then(res => productsLoaded(res))
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

    // Change view
    const paginateMethod = value => setCurrentPage(value);
    const changeItemsMethod = number => setPostsPerPage(number);
    const changePagination = () => setCurrentPage(1);

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <section className="left-side">
            <ProductListButtonPages
                changeItems={changeItemsMethod}
                changeCurrentPage={changePagination}
                className="buttonsGroup"
            />
            <ProductListPosts products={currentPosts} />
            <ProductListPaginator postPerPage={postsPerPage} totalPosts={products.length} paginate={paginateMethod} />
        </section>
    );
};

const mapStateToProps = ({ productsList: { products, loading } }) => ({ products, loading });
const mapDispatchToProps = { productsLoaded, productsRequested };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

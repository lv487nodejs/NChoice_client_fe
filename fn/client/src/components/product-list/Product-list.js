import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';

import { productsLoaded } from '../../actions';
import withStoreService from '../hoc';

const ProductList = ({ storeService, productsLoaded, products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);

    useEffect(() => {
        storeService.getAllProducts()
            .then(res => productsLoaded(res))
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.products.slice(indexOfFirstPost, indexOfLastPost);

    // Change view
    const paginateMethod = value => setCurrentPage(value);
    const changeItemsMethod = number => setPostsPerPage(number);
    const changePagination = () => setCurrentPage(1);

    return (
        <section className="left-side">
            <ProductListButtonPages
                changeItems={changeItemsMethod}
                changeCurrentPage={changePagination}
                className="buttonsGroup"
            />
            <ProductListPosts products={currentPosts} />
            <ProductListPaginator postPerPage={postsPerPage} totalPosts={products.products.length} paginate={paginateMethod} />
        </section>
    );
};

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = { productsLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));

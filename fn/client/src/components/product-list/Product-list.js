import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import SearchBar from '../search-bar/search-bar';
import { productsLoaded } from '../../actions';
import withStoreService from '../hoc';
import ProductSort from '../product-sort'

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

    return (<div className="productListPage">

        <div className="productCategory"> <span> All categories </span></div >

        <div className="sortField" >
            <SearchBar className="searchField" />
            <ProductSort />
            <ProductSort />
        </div>

        <div className="filters"> Filters</div><div className="list" >
            <ProductListButtonPages changeItems={changeItemsMethod}
                changeCurrentPage={changePagination}
                className="buttonsGroup productListButtons " />
            <ProductListPosts products={currentPosts}
                className="productList" />
            <ProductListPaginator postPerPage={postsPerPage}
                totalPosts={products.products.length}
                paginate={paginateMethod}
                className="paginator" />
        </div>
    </div>
    );
};

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = { productsLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));
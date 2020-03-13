import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    filterByName,
    productsLoaded,
} from '../../actions';

import withStoreService from '../hoc';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ storeService, catalog, productsLoaded, filterByName, handler, searchTerm }) => {
    useEffect(() => {
        storeService.getProductsByFilter({ searchTerm }).then(res => {
            productsLoaded(res);
        });
    }, [searchTerm, storeService, productsLoaded]);

    const filterAddNameHandler = (e) => {
        if (e.target.value) {
            filterByName(e.target.value);
        } else {
            filterByName('');
        }
    };
    return (
        <Form>
            <Form.Control handler={filterAddNameHandler} type="searchTerm" className="search-bar" placeholder="Search..." onChange={filterAddNameHandler} />
        </Form>
    );
};

const mapStateToProps = ({ filter: { searchTerm }, catalogsList: { catalog } }) => ({
    searchTerm,
    catalog,
});

const mapDispatchToProps = dispatch => ({
    filterByName: searchTerm => dispatch(filterByName(searchTerm)),
    productsLoaded: products => dispatch(productsLoaded(products)),
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
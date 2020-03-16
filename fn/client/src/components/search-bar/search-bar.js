import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { filterByName, productsLoaded } from '../../actions';

import withStoreService from '../hoc';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ storeService, catalog, productsLoaded, filterByName, searchTerm }) => {
    useEffect(() => {
        storeService.getProductsByFilter({ searchTerm }).then(res => {
            productsLoaded(res.products);
        });
    }, [searchTerm, storeService, productsLoaded]);

    const handleCatchName = event => {
        filterByName(event.target.value);
    };

    return (
        <Form>
            <Form.Control
                type="searchTerm"
                className="search-bar"
                placeholder="Search..."
                onChange={handleCatchName}
            />
        </Form>
    );
};

const mapStateToProps = ({ filter: { searchTerm }, catalogsList: { catalog } }) => ({
    searchTerm,
    catalog,
});

const mapDispatchToProps = { filterByName, productsLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
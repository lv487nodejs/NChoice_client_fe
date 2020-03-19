import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { filterByName, productsLoaded, setSearchValue } from '../../actions';

import withStoreService from '../hoc';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ storeService, productsLoaded, filterByName, setSearchValue, searchTerm,searchValue }) => {

    useEffect(() => {
        storeService.getProductsByFilter({ searchTerm }).then(res => {
            productsLoaded(res.products);
            setSearchValue('');
        });
    }, [searchTerm, storeService, productsLoaded, filterByName ]);

    const handleChange = event => {
        const value = event.target.value;
        setSearchValue(value);

    };

    const handleCatchName = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            filterByName(searchValue);
        }
    };

    return (
        <Form>
            <Form.Control
                type="searchTerm"
                className="search-bar"
                placeholder="Search..."
                onChange={handleChange}
                onKeyDown={handleCatchName}
                value={searchValue}
            />
        </Form>
    );
};

const mapStateToProps = ({ filter: { searchValue, searchTerm }}) => ({
    searchTerm,
    searchValue,
});

const mapDispatchToProps = { filterByName, productsLoaded, setSearchValue };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
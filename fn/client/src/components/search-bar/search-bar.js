import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { filterByName, productsLoaded, setSearchValue, } from '../../actions';

import withStoreService from '../hoc';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ catalog, storeService, productsLoaded, filterByName, setSearchValue, searchTerm, searchValue, setSearchTerm }) => {

    useEffect(() => {
        storeService.getProductsByFilter({ searchTerm }).then(res => {
            productsLoaded(res.products);
            setSearchValue('');
        });
    }, [storeService,productsLoaded,searchTerm, setSearchValue]);

    useEffect(() => () => filterByName(''), [filterByName]);

    const handleChange = event => {
        const value = event.target.value;
        setSearchValue(value);

    };

    const handleCatchName = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            filterByName(searchValue);
            setSearchValue('');
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
                onKeyUp={handleChange}
            />
        </Form>
    );
};

const mapStateToProps = ({ filter: { searchValue, searchTerm }, catalogsList: { catalog } }) => ({
    searchTerm,
    searchValue,
    catalog,
});

const mapDispatchToProps = { filterByName, productsLoaded, setSearchValue };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
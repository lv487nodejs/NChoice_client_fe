import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { filterByName, setProducts, setSearchValue, } from '../../actions';

import withStoreService from '../hoc';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ filterByName, setSearchValue, searchValue, }) => {

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

            <Form.Control
                type="searchTerm"
                className="search-bar"
                placeholder="Search..."
                onChange={handleChange}
                onKeyDown={handleCatchName}
                value={searchValue}
                onKeyUp={handleChange}
            />
    );
};

const mapStateToProps = ({ filter: { searchValue, searchTerm }, catalogsList: { catalog } }) => ({
    searchTerm,
    searchValue,
    catalog,
});

const mapDispatchToProps = { filterByName, setProducts, setSearchValue };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(SearchBar));

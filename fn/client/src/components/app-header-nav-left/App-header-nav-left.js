import React, { useEffect } from 'react';
import './App-header-nav-left.css';

import { connect } from 'react-redux';
import { catalogsLoaded, catalogsRequested } from '../../actions';
import withStoreService from '../hoc';
import AppHeaderNavLeftItem from '../app-header-nav-left-item';

const AppHeaderNavLeft = ({ storeService, catalogsLoaded, catalogsRequested, catalogs }) => {
    useEffect(() => {
        catalogsRequested();
        storeService
            .getAllCatalogs()
            .then(res => catalogsLoaded(res))
            .then(res => console.log(res));
    }, [catalogsLoaded, catalogsRequested, storeService]);

    const items = catalogs.map(catalog => (
        <li key={catalog._id}>
            <AppHeaderNavLeftItem catalog={catalog.catalog} />
        </li>
    ));

    return (
        <nav className="nav-bar">
            <ul>{items}</ul>
        </nav>
    );
};

const mapStateToProps = ({ catalogsList: { catalogs, loading } }) => ({ catalogs, loading });
const mapDispatchToProps = { catalogsLoaded, catalogsRequested };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavLeft));

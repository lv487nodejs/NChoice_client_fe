import React, { useEffect } from 'react';
import './App-header-nav-left.css';

import { catalogsLoaded } from '../../actions';
import withStoreService from '../hoc';
import { connect } from 'react-redux';
import AppHeaderNavLeftItem from '../app-header-nav-left-item';

const AppHeaderNavLeft = ({ storeService, catalogs }) => {
    useEffect(() => {
        storeService.getAllCatalogs()
            .then(res => {
                return catalogsLoaded(res)});
    }, []);

    return (
        <nav className="nav-bar">
            <ul>
                {catalogs.catalogs.map(catalog => {
                    return (
                        <li key={catalog.id}>
                            <AppHeaderNavLeftItem catalog={catalog.catalog} />
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
};

const mapStateToProps = ({ catalogs }) => ({ catalogs });
const mapDispatchToProps = { catalogsLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavLeft));

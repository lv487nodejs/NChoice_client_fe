import React, { useEffect } from 'react';
import './App-header-nav-left.css';

import { connect } from 'react-redux';
import { catalogsLoaded } from '../../actions';
import withStoreService from '../hoc';
import AppHeaderNavLeftItem from '../app-header-nav-left-item';

const AppHeaderNavLeft = ({ storeService, catalogsLoaded, catalogs }) => {
    useEffect(() => {
        storeService.getAllCatalogs().then(res => catalogsLoaded(res));
    }, []);

    return (
        <nav className="nav-bar">
            <ul>
                {catalogs.catalogs.map(catalog => (
                    <li key={catalog._id}>
                        <AppHeaderNavLeftItem catalog={catalog.catalog} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const mapStateToProps = ({ catalogs }) => ({ catalogs });
const mapDispatchToProps = { catalogsLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavLeft));

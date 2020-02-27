import React, { useEffect } from 'react';
import './App-header-nav-left.css';

import { connect } from 'react-redux';
import AppHeaderNavLeftItem from '../app-header-nav-left-item';

const AppHeaderNavLeft = ({ catalogs }) => {
    useEffect(() => {

    }, []);

    return (
        <nav className="nav-bar">
            <ul>
                {
                catalogs.map(catalog => (
                    <li key={catalog._id}>
                        <AppHeaderNavLeftItem catalog={ catalog.catalog } />
                    </li>
                ))
                }
            </ul>
        </nav>
    );
};

const mapStateToProps = ({ catalogsList: { catalogs, loading } }) => ({ catalogs, loading });

export default connect(mapStateToProps)(AppHeaderNavLeft);

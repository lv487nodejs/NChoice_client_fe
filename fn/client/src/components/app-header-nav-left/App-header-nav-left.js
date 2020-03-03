import React, { useEffect, useState } from 'react';
import './App-header-nav-left.css';

import { connect } from 'react-redux';
import { catalogsLoaded, catalogsRequested } from '../../actions';
import withStoreService from '../hoc';
import AppHeaderNavLeftItem from '../app-header-nav-left-item';
import AppHeaderNavLeftItemDropDown from '../app-header-nav-left-item-dropdown'


const AppHeaderNavLeft = ({ storeService, catalogsLoaded, catalogsRequested, catalogs }) => {
    const [isShown, setIsShown] = useState('');

    useEffect(() => {
        catalogsRequested();
        storeService
            .getAllCatalogs()
            .then(res => catalogsLoaded(res))
    }, [catalogsLoaded, catalogsRequested, storeService]);

  const onEnter = (e, catalog) => {
        setIsShown(catalog)

}
    const onLeave = (e) => {
        setIsShown('')
    }


    const items = catalogs.map((catalog) => (
        <li 
            key={catalog._id}
            className="nav-item"
            onMouseEnter={(e) => onEnter(e, catalog.catalog)}
            onMouseLeave={onLeave}
        > 
            <AppHeaderNavLeftItem catalog={catalog.catalog} />
            {(isShown === catalog.catalog) && 
                <div key={catalog.catalog} className="drop-down-container">
                    <AppHeaderNavLeftItemDropDown catalog={catalog} />
                </div>
            }               
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

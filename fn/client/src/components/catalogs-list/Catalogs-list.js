import React, { useEffect } from 'react';
import './Catalogs-list.css';

import { connect } from 'react-redux';
import { catalogsLoaded, catalogsRequested } from '../../actions';
import withStoreService from '../hoc';
import CatalogsListItem from '../catalogs-list-item/Catalogs-list-item';
import LoadingSpinner from '../Loading-spinner';


const CatalogsList = ( { storeService, catalogsLoaded, catalogsRequested, catalogs, loading } ) => {
    
    useEffect(() => {
        catalogsRequested()
        storeService.getAllCatalogs()
            .then(res => catalogsLoaded(res))
            .then(res => console.log(res));
    }, []);


    if (loading) {
        return <LoadingSpinner />
    }

    return (
    <div className="catalogs">
        {catalogs.map(catalog => <CatalogsListItem catalog={catalog.catalog} />)}
    </div>
    )
};

const mapStateToProps = ({ catalogsList: { catalogs, loading } }) => ({ catalogs, loading });
const mapDispatchToProps = { catalogsLoaded, catalogsRequested };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(CatalogsList));

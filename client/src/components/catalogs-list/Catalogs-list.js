import React, {useEffect} from 'react';
import './Catalogs-list.css';

import {connect} from 'react-redux';
import {catalogsLoaded, catalogsRequested} from '../../actions';
import withStoreService from '../hoc';
import CatalogsListItem from '../catalogs-list-item/Catalogs-list-item';
import LoadingSpinner from '../Loading-spinner';

const CatalogsList = ({
                          storeService,
                          catalogsLoaded,
                          catalogsRequested,
                          catalogs,
                          loading
                      }) => {
    useEffect(() => {
        catalogsRequested();
        storeService.getAllCatalogs().then((res) => catalogsLoaded(res));
    }, [catalogsLoaded, catalogsRequested, storeService]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    const items = catalogs.map((catalog) => (
        <CatalogsListItem key={catalog._id} catalog={catalog.catalog}/>
    ));

    return <div>
        <div className='home-page-bg'>
            <div className='home-page-bg__logo'>
                <h6 className='home-page-bg__logo__row-1'>designed</h6>
                <h1 className='home-page-bg__logo__row-2'>horondi</h1>
                <h5 className='home-page-bg__logo__row-3'>made in lviv</h5>
            </div>
        </div>
        <div className="catalogs">{items}</div>
        <div className='home-page-footer'>
          <div><img className='people-img' src='/images/people/img1.jpg'/> </div>
          <div><img className='people-img' src='/images/people/img2.jpg'/> </div>
          <div><img className='people-img' src='/images/people/img3.jpg'/> </div>
          <div><img className='people-img' src='/images/people/img4.jpg'/> </div>
        </div>
    </div>;
};

const mapStateToProps = ({catalogsList: {catalogs, loading}}) => ({
    catalogs,
    loading
});
const mapDispatchToProps = {catalogsLoaded, catalogsRequested};

export default withStoreService()(
    connect(mapStateToProps, mapDispatchToProps)(CatalogsList)
);

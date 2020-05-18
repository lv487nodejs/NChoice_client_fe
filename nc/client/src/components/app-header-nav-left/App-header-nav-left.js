import React, { useEffect, useState } from 'react';
import './App-header-nav-left.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  catalogsLoaded,
  catalogsRequested,
  filterAddCategory,
  filterRemoveAllCategories,
  filterByName,
  setCatalogFilter,
  clearFilter,
} from '../../actions';
import withStoreService from '../hoc';
import AppHeaderNavLeftItem from '../app-header-nav-left-item';
import AppHeaderNavLeftItemDropDown from '../app-header-nav-left-item-dropdown';

const AppHeaderNavLeft = ({
  storeService,
  catalogsLoaded,
  catalogsRequested,
  catalogs,
  filterAddCategory,
  filterRemoveAllCategories,
  filterByName,
  setCatalogFilter,
  clearFilter,
}) => {
  const [isShown, setIsShown] = useState('');

  useEffect(() => {
    catalogsRequested();
    storeService.getAllCatalogs().then((res) => catalogsLoaded(res));
  }, [catalogsLoaded, catalogsRequested, storeService]);

  const onEnter = (e, catalog) => {
    setIsShown(catalog);
  };
  const onLeave = (e) => {
    setIsShown('');
  };
  const filterAddCategoryHandler = (category, catalog) => {
    filterByName('');
    clearFilter();
    filterAddCategory(category);
    setCatalogFilter(catalog);
    setIsShown('');
  };

  const filterRemoveCategoriesHandler = () =>{
    filterRemoveAllCategories();
    setIsShown('')
  }

  const filterAddCatalog = (catalog) => () => {
    filterByName('');
    clearFilter();
    setCatalogFilter(catalog);
  };

  const items = catalogs.map((catalog) => (
    <li
      key={catalog._id}
      className="nav-item"
      onMouseEnter={(e) => onEnter(e, catalog.catalog)}
      onMouseLeave={onLeave}
    >
      <AppHeaderNavLeftItem catalog={catalog.catalog} catalogHandler={filterAddCatalog} />
      {isShown === catalog.catalog && (
        <div key={catalog.catalog} className="drop-down-container">
          <AppHeaderNavLeftItemDropDown
            catalog={catalog}
            clickHandler={filterAddCategoryHandler}
            categoryRemover={filterRemoveCategoriesHandler}
          />
        </div>
      )}
    </li>
  ));

  return (
    <nav className="nav-bar nav-left">
      <ul>
        {items}
        <li><Link to="/news" >News</Link></li>
        </ul>
    </nav>
  );
};

const mapStateToProps = ({ catalogsList: { catalogs, loading } }) => ({
  catalogs,
  loading,
});
const mapDispatchToProps = {
  catalogsLoaded,
  catalogsRequested,
  filterAddCategory,
  filterRemoveAllCategories,
  filterByName,
  setCatalogFilter,
  clearFilter,
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavLeft)
);

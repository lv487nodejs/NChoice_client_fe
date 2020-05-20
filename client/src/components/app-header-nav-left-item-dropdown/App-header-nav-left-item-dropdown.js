import React from "react";
import Nav from 'react-bootstrap/Nav';

import './App-header-nav-left-item-dropdown.css';
import { Link } from 'react-router-dom';
import { PRODUCT_LIST_URL } from '../../configs/frontend-config';

const AppHeaderNavLeftItemDropDown = ({
  catalog,
  clickHandler,
  categoryRemover,
}) => {
  const items = catalog.categories.map((category) => (
    <Nav key={category._id}>
      <Link
        to={PRODUCT_LIST_URL + catalog.catalog}
        onClick={() => clickHandler(category.category, catalog.catalog)}
      >
        {category.category}
      </Link>
    </Nav>
  ));

  let categoryRemoverHandler = () => {
    categoryRemover(catalog.catalog);
  };

  return (
    <Nav defaultActiveKey="/home" className="flex-column drop-down">
      <Link
        to={PRODUCT_LIST_URL + catalog.catalog}
        className="nav-link"
        role="button"
        onClick={categoryRemoverHandler}
      >
        All Categories
      </Link>
      {items}

    </Nav>
  )
};
export default AppHeaderNavLeftItemDropDown;

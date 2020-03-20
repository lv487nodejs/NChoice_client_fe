import React from 'react';
import Nav from 'react-bootstrap/Nav';

import './App-header-nav-left-item-dropdown.css';
import { Link } from 'react-router-dom';
import { PRODUCT_LIST_URL } from '../../configs/frontend-config';

const AppHeaderNavLeftItemDropDown = ({
  catalog,
  handler,
  categoryRemover,
}) => {
  const items = catalog.categories.map((category) => (
    <Nav key={category._id}>
      <Link
        to={PRODUCT_LIST_URL + catalog.catalog}
        onClick={() => handler(category.category)}
      >
        {category.category}
      </Link>
    </Nav>
  ));

  return (
    <Nav defaultActiveKey="/home" className="flex-column drop-down">
      <Link
        to={PRODUCT_LIST_URL + catalog.catalog}
        className="nav-link"
        role="button"
        onClick={() => categoryRemover()}
      >
        All Categories
      </Link>
      {items}
    </Nav>
  );
};

export default AppHeaderNavLeftItemDropDown;

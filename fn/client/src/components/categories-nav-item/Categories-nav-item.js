import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesNavItem = ({ catalog, name, handler }) => (
  <Link to={`/productlist/${catalog}`} onClick={() => handler(name)}>
    {name}
  </Link>
);

export default CategoriesNavItem;

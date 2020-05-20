import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesNavItem = ({ catalog, name, handler, config }) => (
  <Link to={config + catalog} onClick={() => handler(name)}>
    {name}
  </Link>
);

export default CategoriesNavItem;

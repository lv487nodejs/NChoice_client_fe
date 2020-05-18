import React from 'react';
import { Link } from 'react-router-dom';
import './App-header-nav-left-item.css';


const AppHeaderNavLeftItem = ({ catalog, catalogHandler }) => {
  return (
    <Link key={catalog} onClick={catalogHandler(catalog)} to={`/catalogs/${catalog}`}>
      {catalog}
    </Link>
  );
};

export default AppHeaderNavLeftItem;

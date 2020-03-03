import React from 'react';
import { Link } from 'react-router-dom';
import './App-header-nav-left-item.css';


const AppHeaderNavLeftItem = ( { catalog } ) => {


  return (
    <Link key={catalog} to={`/catalogs/${catalog}`}>{ catalog }</Link>
    
  )
}

export default AppHeaderNavLeftItem
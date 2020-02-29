import React from 'react';
import Nav from 'react-bootstrap/Nav'

import './App-header-nav-left-item-dropdown.css'
import { Link } from 'react-router-dom';

const AppHeaderNavLeftItemDropDown = ( {catalog} ) => {

const items = catalog.categories.map(category => (
    <Nav.Link key={category._id}>{category.category}</Nav.Link>
))

return (
    <Nav defaultActiveKey="/home" className="flex-column drop-down">
        <Nav.Link><Link key="allproducts" to={`/productlist`}>All categories</Link></Nav.Link>
        {items}
    </Nav>
    )}

export default AppHeaderNavLeftItemDropDown
import React from 'react';
import { Link } from 'react-router-dom';
import './App-header-nav-left.css';

const AppHeaderNavLeft = () => (
    <nav className="nav-bar">
        <ul>
            <li key="1">
                <Link to="/catalogs/men">Men</Link>
            </li>
            <li key="2">
                <Link to="/catalogs/women">Women</Link>
            </li>
            <li key="3">
                <Link to="/catalogs/kids">Kids</Link>
            </li>
        </ul>
    </nav>
);

export default AppHeaderNavLeft;

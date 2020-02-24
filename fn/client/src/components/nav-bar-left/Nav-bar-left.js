import React from 'react';
import { Link } from 'react-router-dom';
import './Nav-bar-left.css';

const NavBarLeft = () => (
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

export default NavBarLeft;

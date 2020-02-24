import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav-bar">
                <ul>
                    <li key='1'><Link to='/catalogs/men'>Men</Link></li>
                    <li key='2'><Link to='/catalogs/women'>Women</Link></li>
                    <li key='3'><Link to='/catalogs/kids'>Kids</Link></li>
                </ul>
            </nav>
            <Link to='/'><img src='/images/logo.svg' alt='Logo' /></Link>
            <nav className="nav-bar">
                <ul>
                    <li key='4'><Link to='/wishlist'>Wishlist</Link></li>
                    <li key='5'><Link to='/currency'>Currency</Link></li>
                    <li key='6'><Link to='/register'>Register</Link></li>
                </ul>
            </nav>
        </header>
    )

}

export default Header
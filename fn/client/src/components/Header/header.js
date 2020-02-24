import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

import NavBarLeft from '../nav-bar-left';
import NavBarRight from '../nav-bar-right';

const Header = () => (
    <header className="header">
        <NavBarLeft />
        <Link to="/">
            <img className="logo" src="/images/logo.svg" alt="Logo" />
        </Link>
        <NavBarRight />
    </header>
);

export default Header;

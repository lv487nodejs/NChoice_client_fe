import React from 'react';
import './App-header.css';

import { Link } from 'react-router-dom';

import AppHeaderNavLeft from '../app-header-nav-left';
import AppHeaderNavRight from '../app-header-nav-right';

const AppHeader = () => (
    <header className="header">
        <AppHeaderNavLeft />
        <Link to="/">
            <img className="logo" src="/images/logo.svg" alt="Logo" />
        </Link>
        <AppHeaderNavRight />
    </header>
);

export default AppHeader;

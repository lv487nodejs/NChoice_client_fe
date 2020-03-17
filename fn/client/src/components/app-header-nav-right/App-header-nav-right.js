import React from 'react';
import { Link } from 'react-router-dom';

import './App-header-nav-right.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import Currency from '../currency';

const AppHeaderNavRight = () => (
    <nav className="nav-bar">
        <ul>
            <li key="4">
                <Link to="/wishlist">
                    <FontAwesomeIcon icon={faHeart} />
                </Link>
            </li>
            <li key="5">
                <span className="currency-button"><Currency /></span>
            </li>
            <li key="6">
                <Link to="/login">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </li>
        </ul>
    </nav>
);

export default AppHeaderNavRight;

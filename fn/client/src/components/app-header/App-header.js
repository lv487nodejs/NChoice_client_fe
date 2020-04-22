import React from 'react';
import './App-header.css';

import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';

import AppHeaderNavLeft from '../app-header-nav-left';
import AppHeaderNavRight from '../app-header-nav-right';

const AppHeader = () => (

    <header className='header-wrapper'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Link to="/"><Navbar.Brand className="logo"/></Link>

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <AppHeaderNavLeft />
                </Nav>
            </Navbar.Collapse>
          <Nav>
            <AppHeaderNavRight />
          </Nav>
        </Navbar>
    </header>
);

export default AppHeader;

import React from 'react';
import './App-header.css';

import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';

import AppHeaderNavLeft from '../app-header-nav-left';
import AppHeaderNavRight from '../app-header-nav-right';

const AppHeader = () => (
    <header >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <AppHeaderNavLeft />
                </Nav>
                <Link to="/"><Navbar.Brand className="logo"></Navbar.Brand></Link>

                <Nav>
                    <AppHeaderNavRight />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default AppHeader;

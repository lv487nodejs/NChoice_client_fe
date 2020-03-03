import React from 'react';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';
import Footer from '../app-footer';

import MainPageContainer from '../../container';

import './App.css';

const App = () => (
    <div className="app">
        <NavBar />
        <NavMenu />
        <MainPageContainer />
        <Footer />
    </div>
);

export default App;

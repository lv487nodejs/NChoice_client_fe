import React from 'react';

import { Container } from '@material-ui/core';
import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';
import Footer from '../app-footer';

import MainPageContainer from '../../container';

const App = () => (
    <Container>
        <NavBar />
        <NavMenu />
        <MainPageContainer />
        <Footer />
    </Container>
);

export default App;

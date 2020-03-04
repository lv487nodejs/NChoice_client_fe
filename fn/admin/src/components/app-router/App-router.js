import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StatsPageContainer, ProductsPageContainer } from '../../container';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';
import Footer from '../app-footer';

const pathToProducts = '/products';

const AppRouter = () => (
    <Router>
        <NavBar />
        <NavMenu />
        <Switch>
            <Route path="/" exact component={StatsPageContainer} />
            <Route path={pathToProducts} exact component={ProductsPageContainer} />
        </Switch>
        <Footer />
    </Router>
);

export default AppRouter;

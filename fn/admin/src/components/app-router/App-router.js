import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    StatsPageContainer,
    ProductsPageContainer,
    UsersPageContainer,
    UserDetailsPageContainer,
} from '../../container';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';

const pathToProducts = '/products';
const pathToUsers = '/users';
const pathUserDetails = '/user/:id';

const AppRouter = () => (
    <Router>
        <NavBar />
        <NavMenu />
        <Switch>
            <Route path="/" exact component={StatsPageContainer} />
            <Route path={pathToProducts} exact component={ProductsPageContainer} />
            <Route path={pathToUsers} exact component={UsersPageContainer} />
            <Route path={pathUserDetails} exact component={UserDetailsPageContainer} />
        </Switch>
    </Router>
);

export default AppRouter;

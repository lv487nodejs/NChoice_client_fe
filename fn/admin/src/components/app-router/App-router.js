import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    StatsPageContainer,
    ProductsPageContainer,
    // ProductPageContainer,
    UsersPageContainer,
    UserDetailsPageContainer,
    BrandsPageContainer,
    CategoriesPageContainer,
} from '../../container';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';
import ProductPage from '../product-page/Product-page';

const pathToProducts = '/products';
const pathToUsers = '/users';
const pathToBrands = '/brands';
const pathToCategories = '/categories';
const pathToUserDetails = '/user/:id';
// const pathToProductDetails = '/product/:id';

const AppRouter = () => (
    <Router>
        <NavBar />
        <NavMenu />
        <Switch>
            <Route path="/" exact component={StatsPageContainer} />
            <Route
                path={pathToProducts}
                exact
                component={ProductsPageContainer}
            />
            <Route path={pathToUsers} exact component={UsersPageContainer} />
            <Route
                path={pathToUserDetails}
                exact
                component={UserDetailsPageContainer}
            />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route path={pathToBrands} exact component={BrandsPageContainer} />
            <Route
                path={pathToCategories}
                exact
                component={CategoriesPageContainer}
            />
        </Switch>
    </Router>
);

export default AppRouter;

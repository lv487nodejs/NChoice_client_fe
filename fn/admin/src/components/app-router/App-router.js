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
    CategoryDetailsPageContainer,
} from '../../container';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';
import ProductPage from '../product-page/Product-page';
import ProductAddPage from '../product-add-page';
import CategoryAddPage from '../category-add-page';

const pathToProducts = '/products';
const pathToUsers = '/users';
const pathToBrands = '/brands';
const pathToCategories = '/categories';
const pathToUserDetails = '/user/:id';
// const pathToProductDetails = '/product/:id';
const pathToCategoriesDetails = '/category/:id';

const AppRouter = () => (
    <Router>
        <NavBar />
        <NavMenu />
        <Switch>
            <Route path="/" exact component={StatsPageContainer} />
            <Route path={pathToProducts} exact component={ProductsPageContainer} />
            <Route path={pathToUsers} exact component={UsersPageContainer} />
            <Route path={pathToUserDetails} exact component={UserDetailsPageContainer} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route path={pathToBrands} exact component={BrandsPageContainer} />
            <Route path={pathToCategories} exact component={CategoriesPageContainer} />
            <Route path={pathToCategoriesDetails} exact component={CategoryDetailsPageContainer} />
            <Route path="/addcategory" exact component={CategoryAddPage} />
            <Route path="/addproduct" exact component={ProductAddPage} />
            <Route path="/prodtest" exact component={ProductPage} />
        </Switch>
    </Router>
);

export default AppRouter;

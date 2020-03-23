import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    StatsPageContainer,
    ProductsPageContainer,
    UsersPageContainer,
    UserDetailsPageContainer,
    BrandsPageContainer,
    CategoriesPageContainer,
    CategoryDetailsPageContainer,
    ProductDetailsPage,
} from '../../container';

import ProductAddPage from '../product-add-page';
import CategoryAddPage from '../category-add-page';
import BrandAddPage from '../brand-add-page';
import BrandDetails from '../brand-details';

import DialogWindow from '../dialog-window';
import SnackbarItem from '../snackbar-item';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';

const PATH_TO_STATS = '/';
const PATH_TO_PRODUCTS = '/products';
const PATH_TO_USERS = '/users';
const PATH_TO_BRANDS = '/brands';
const PATH_TO_CATEGORIES = '/categories';
const PATH_TO_USER_DETAILS = '/user/:id';
const PATH_TO_PRODUCT_DETAILS = '/product/:id';
const PATH_TO_CATEGORY_DETAILS = '/category/:id';
const PATH_TO_ADD_PRODUCT = '/productadd';
const PATH_TO_ADD_CATEGORY = '/categoryadd';
const PATH_TO_BRAND_DETAILS = '/brand/:id';
const PATH_TO_ADD_BRAND = '/brandadd';

const AppRouter = () => (
    <Router>
        <NavBar />
        <NavMenu />
        <Switch>
            <Route path={PATH_TO_STATS} exact component={StatsPageContainer} />
            <Route path={PATH_TO_PRODUCTS} exact component={ProductsPageContainer} />
            <Route path={PATH_TO_USERS} exact component={UsersPageContainer} />
            <Route path={PATH_TO_USER_DETAILS} exact component={UserDetailsPageContainer} />
            <Route path={PATH_TO_PRODUCT_DETAILS} exact component={ProductDetailsPage} />
            <Route path={PATH_TO_BRANDS} exact component={BrandsPageContainer} />
            <Route path={PATH_TO_CATEGORIES} exact component={CategoriesPageContainer} />
            <Route path={PATH_TO_CATEGORY_DETAILS} exact component={CategoryDetailsPageContainer} />
            <Route path={PATH_TO_ADD_CATEGORY} exact component={CategoryAddPage} />
            <Route path={PATH_TO_ADD_PRODUCT} exact component={ProductAddPage} />
            <Route path={PATH_TO_ADD_BRAND} exact component={BrandAddPage} />
            <Route path={PATH_TO_BRAND_DETAILS} exact component={BrandDetails} />
        </Switch>
        <DialogWindow />
        <SnackbarItem />
    </Router>
);

export default AppRouter;

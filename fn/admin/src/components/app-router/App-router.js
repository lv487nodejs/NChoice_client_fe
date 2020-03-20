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
import BrandAddPage from '../brand-add-page';
import BrandDetails from '../brand-details';

const pathToProducts = '/products';
const pathToUsers = '/users';
const pathToBrands = '/brands';
const pathToCategories = '/categories';
const pathToUserDetails = '/user/:id';
const pathToProductDetails = '/product/:id';
const pathToCategoriesDetails = '/category/:id';
const pathToBrandDetails = '/brand/:id';
const pathToAddCategoryPage = '/categoryadd';
const pathToAddProductPage = '/productadd';
const pathToAddBrandPage = '/brandadd';

const AppRouter = () => (
    <Router>
        <NavBar />
        <NavMenu />
        <Switch>
            <Route path="/" exact component={StatsPageContainer} />
            <Route path={pathToProducts} exact component={ProductsPageContainer} />
            <Route path={pathToUsers} exact component={UsersPageContainer} />
            <Route path={pathToUserDetails} exact component={UserDetailsPageContainer} />
            <Route path={pathToProductDetails} exact component={ProductPage} />
            <Route path={pathToBrands} exact component={BrandsPageContainer} />
            <Route path={pathToCategories} exact component={CategoriesPageContainer} />
            <Route path={pathToCategoriesDetails} exact component={CategoryDetailsPageContainer} />
            <Route path={pathToAddCategoryPage} exact component={CategoryAddPage} />
            <Route path={pathToAddProductPage} exact component={ProductAddPage} />
            <Route path={pathToAddBrandPage} exact component={BrandAddPage} />
            <Route path={pathToBrandDetails} exact component={BrandDetails} />
        </Switch>
    </Router>
);

export default AppRouter;

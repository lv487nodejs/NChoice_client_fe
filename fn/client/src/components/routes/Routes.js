import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePageContainer, CategoriesPageContainer, ProductListPageContainer } from '../../containters';

import AppHeader from '../app-header';
import Register from '../register';
import AppFooter from '../app-footer';
import Cart from "../cart/Cart";

const Routes = () => (
    <Router>
        <AppHeader />
        <Switch>
            <Route path="/" exact component={HomePageContainer} />
            <Route
                path="/catalogs/:name"
                exact
                render={({ match }) => {
                    const { name } = match.params;
                    return <CategoriesPageContainer catalog={name} />;
                }}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/cart" exact component={Cart} />
            <Route path={`/productlist/:name`}
                    exact
                    render={({ match }) => {
                        const { name } = match.params;
                        return <ProductListPageContainer catalog={name}/>
                    }}
                     />
        </Switch>
        <AppFooter />
    </Router>
);

export default Routes;

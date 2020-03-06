import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePageContainer, CategoriesPageContainer, ProductListPageContainer, ProductDetailsContainer } from '../../containters';

import AppHeader from '../app-header';
import Register from '../register';
import AppFooter from '../app-footer';


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
            <Route path={`/productlist/:name`}
                exact
                render={({ match }) => {
                    const { name } = match.params;
                    return <ProductListPageContainer catalog={name} />;
                }}
            />

            {/* <Route path={`:id`} exact component={ProductDetailsContainer} /> */}

            <Route path={`/products/:id`}
                exact
                render={({ match }) => {
                    const { id } = match.params;
                    return <ProductDetailsContainer id={id} />;
                }}
            />
        </Switch>
        <AppFooter />
    </Router>
);

export default Routes;

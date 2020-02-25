import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePageContainer, CategoriesPageContainer, ProductListPageContainer } from '../../containters';

import Header from '../header';
import Register from '../register';
import Footer from '../footer';

const Routes = () => (
    <Router>
        <Header />
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
            <Route path="/productlist" exact component={ProductListPageContainer} />
        </Switch>
        <Footer />
    </Router>
);

export default Routes;

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header1';
import Catalogs from '../catalogs1';
import Register from '../register1';
import CategoryItems from '../category-items';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={Catalogs} />
                    <Route
                        path="/catalogs/:name"
                        exact
                        render={({ match }) => {
                            const { name } = match.params;
                            return <CategoryItems catalog={name} />;
                        }}
                    />
                    <Route path="/register" exact component={Register} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Catalogs from '../Catalogs';
import Register from '../Register';
import CategoryItems from '../category-items';
import PlpContainer from '../../containers';

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
            <PlpContainer />
        </div>
    );
}

export default App;

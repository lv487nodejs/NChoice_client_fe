import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from '../Header'
import Catalogs from '../Catalogs'
import Register from '../Register'
import CatalogCategoriesItem from "../CatalogCategoriesItem"


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Catalogs} />
          <Route
            path='/catalogs/:name'
            exact
            render={({ match }) => {
              const { name } = match.params;
              return <CatalogCategoriesItem catalogName={name} />
            }}
          />
          <Route path="/register" exact component={Register}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

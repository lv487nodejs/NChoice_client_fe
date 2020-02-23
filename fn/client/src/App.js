import React, {Component} from 'react';
import HomePageContainer from "./containers/homePageContainer";
import MainCategoryItems from "./components/MainCategoryItems/mainCategoryItems";
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar/navBar";


class App extends Component {
  render() {
    return (

      <React.Fragment>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={HomePageContainer}/>
          < Route
            path='/women'
            render={(props) => < MainCategoryItems {...props} catalogName={'Women'}/>}
          />

          <Route
            path='/men'
            render={(props) => <MainCategoryItems {...props} catalogName={'Male'}/>}
          />

          < Route
            path='/children'
            render={(props) => <MainCategoryItems {...props} catalogName={'Kids'}/>
            }
          />

        </Switch>

      </React.Fragment>
    );
  }
}

export default App
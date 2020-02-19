import React from 'react';
import MainCategoryItems from '../MainCategoryItems/mainCategoryItems';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function MainCategories() {

  return (
    <div>
      {/*<ul>*/}
        {/*<li>*/}
          {/*<Link to='/women' className='change'> Women </Link>*/}
        {/*</li>*/}
        {/*<li>*/}
          {/*<Link to='/men' className='change'> Men </Link>*/}
        {/*</li>*/}
        {/*<li>*/}
          {/*<Link to='/children' className='change'> Children </Link>*/}
        {/*</li>*/}

      {/*</ul>*/}


      <Switch>
        <Route
          path='/women'
          render={(props) => <MainCategoryItems {...props} catalogName={'Women'}/>}
        />

        <Route
          path='/men'
          render={(props) => <MainCategoryItems {...props} catalogName={'Male'}/>}
        />

        <Route
          path='/children'
          render={(props) => <MainCategoryItems {...props} catalogName={'Kids'}/>}
        />
      </Switch>

    </div>
  );
}

export default MainCategories;

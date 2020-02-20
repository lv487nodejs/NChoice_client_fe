import React from 'react';
import MainCategoryItems from '../MainCategoryItems/mainCategoryItems';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

function MainCategories() {

  return (
    <div>
      <div className='container center-block'>
        <div className='row '>

          <div className='col l4  center '>
            <div className='card card-content valign-wrapper'>
              <Link to='/women'> Women </Link>
            </div>
          </div>

          <div className='col l4   center'>
            <div className='card card-content valign-wrapper'>
              <Link to='/men'> Men </Link>
            </div>
          </div>

          <div className='col l4  '>
            <div className='card card-content valign-wrapper'>
              <Link to='/children'> Children </Link>
            </div>
          </div>

        </div>
      </div>

      < Switch>
        < Route
          path='/women'
          render={(props) => <MainCategoryItems {...props} catalogName={'Women'}/>}
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
    </div>

  );
}

export default MainCategories;

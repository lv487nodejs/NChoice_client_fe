import React from "react";
import './navBar.css'
import Basket from '../Basket/basket';
import Currency from '../Currency/currency';
import Wishlist from '../Wishlist/wishlist';
import logo from '../../logo.svg';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import HomePageContainer from "../../containers/homePageContainer";

function NavBar() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to='/' className='brand-logo center' > <img src={logo} className='logo' alt='Logo'/>  </Link>

          <ul className="right hide-on-med-and-down">
            <li>
              <Link to='/currency' className='change'> Currency </Link>
            </li>
            <li>
              <Link to='/wishlist'>Wishlist</Link>
            </li>
            <li>
              <Link to='./basket'>Basket</Link>
            </li>
          </ul>
        </div>
      </nav>

      < Switch>
        < Route
          path='/currency'
          component={Currency}
        />
        <Route
          path='/wishlist'
          component={Wishlist}
        />
        < Route
          path='/basket'
          component={Basket}
        />
        <Route
        path ='./'
        component={HomePageContainer}
        />

      </Switch>
    </div>

  )
}

export default NavBar



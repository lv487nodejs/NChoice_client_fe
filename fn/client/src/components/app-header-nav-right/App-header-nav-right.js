import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import './App-header-nav-right.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import Currency from '../currency';
import { connect } from 'react-redux';
import { getNumbers} from "../../actions";

const AppHeaderNavRight = (props) => {

    useEffect(() => {
    getNumbers()
  }, []);

  return (
    <nav className="nav-bar">
      <ul>
        <li key="4">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart}/>
          </Link>
        </li>
        <li key="5">
          <span className="currency-button"><Currency/></span>
        </li>
        <li key="6">
          <Link to="/register">
            <FontAwesomeIcon icon={faUser}/>
          </Link>
        </li>
        <li key="7">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBasket}/>
            <span> <sup>{props.cartProps.cartNumbers}</sup> </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
};

const mapStateToProps =  state => ({
    cartProps: state.cartState
});


export default connect(mapStateToProps, {getNumbers})(AppHeaderNavRight);

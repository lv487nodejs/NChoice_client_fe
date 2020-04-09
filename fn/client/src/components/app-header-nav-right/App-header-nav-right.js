import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import './App-header-nav-right.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faShoppingBasket, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Currency from '../currency';
import { connect } from 'react-redux';
import { setUserLogged } from "../../actions";

const AppHeaderNavRight = ({ setUserLogged , userLogged }) => {
  let cartNumbers = 0;
  if (localStorage.getItem("cart-numbers")) {
    cartNumbers = localStorage.getItem("cart-numbers");
  }

  const handleLogOut = () => {
    setUserLogged(false)
    localStorage.clear()
  }

  return (
    <nav className="nav-bar">
      <ul>
        <li key="4">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li key="5">
          <span className="currency-button"><Currency /></span>
        </li>
        <li key="6">
          {
            localStorage.getItem('userId') || userLogged ? (
              <p key="8" >
                <Link to={"/userpage"}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </p>
            ) : <Link to="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
          }
        </li>
        <li key="7">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBasket} />
            <span> <sup>{cartNumbers}</sup> </span>
          </Link>
        </li>
        {
          localStorage.getItem('userId') || userLogged ? (
            <li key="8" onClick={handleLogOut}>
              <Link to={"/login"}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Link>
            </li>
          ) : null
        }
      </ul>
    </nav>
  )
};

const mapDispatchToProps = { setUserLogged };

const mapStateToProps = ({ cartReducer: { cartNumbers }, authReducer: { userLogged } }) => ({ cartNumbers, userLogged });

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavRight);

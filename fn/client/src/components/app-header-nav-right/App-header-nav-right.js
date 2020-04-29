import React from "react";
import { Link } from 'react-router-dom';
import './App-header-nav-right.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faShoppingBasket, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Currency from '../currency';
import { connect } from 'react-redux';
import { setUserLogged, setCart } from "../../actions";
import { clearLocalStorage, getFromLocalStorage } from "../../services/localStoreService";

const AppHeaderNavRight = ({ setUserLogged , userLogged, cartNumbers, setCart }) => {

  const handleLogOut = () => {
    setUserLogged(false)
    setCart({ cartNumbers: 0, cartProducts: [] })
    clearLocalStorage()
  }

  return (
    <nav className="nav-bar nav-right" >
      <ul>
        
        <li key="5">
          <span className="currency-button"><Currency /></span>
        </li>
        <li key="4">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li key="7">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBasket} />
            <span> <sup>{cartNumbers}</sup> </span>
          </Link>
        </li>
        <li key="6">
          {
            getFromLocalStorage('userId') || userLogged ? (
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
        {
          getFromLocalStorage('userId') || userLogged ? (
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

const mapDispatchToProps = { setUserLogged, setCart };

const mapStateToProps = ({ cartReducer: { cartNumbers }, authReducer: { userLogged } }) => ({ cartNumbers, userLogged });

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavRight);

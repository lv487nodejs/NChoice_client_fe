import React from 'react';
import { Link } from 'react-router-dom';
import './App-header-nav-right.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faShoppingBasket, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Currency from '../currency';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions";

const AppHeaderNavRight = ({ cartNumbers, logoutUser, userStatus }) => {

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
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          </li>
        <li key="7">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBasket} />
            <span> <sup>{cartNumbers}</sup> </span>
          </Link>
        </li>
        {
          userStatus === 'received' ? <li key="8">
          <Link to={"/login"}>
            <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
          </Link>
        </li> : null
        }
      </ul>
    </nav>
  )
};

const mapDispatchToProps = {logoutUser};

const mapStateToProps = ({ cartReducer: { cartNumbers }, authReducer: {userStatus}}) => ({ cartNumbers, userStatus });

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderNavRight);

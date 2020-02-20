import React from 'react';
import './header.css'
import NavBar from "../NavBar/navBar";
import MainCategories from "../MainCategories/mainCategories";
import {Link} from "react-router-dom";

function Header() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <Link to='/women' className='change'> Women </Link>
            </li>
            <li>
              <Link to='/men' className='change'> Men </Link>
            </li>
            <li>
              <Link to='/children' className='change'> Children </Link>
            </li>
          </ul>

          <Link to='/' className='brand-logo center'> Logo </Link>

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
      <MainCategories/>
      <NavBar/>
    </div>
  )
}

export default Header
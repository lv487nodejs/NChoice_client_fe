import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import { Link } from 'react-router-dom';
import './Wishlist.css'
import {Figure, Button} from 'react-bootstrap'
import ReadMoreReact from 'read-more-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addToWishlist, removeFromWishlist } from "../../actions";
import { getFromLocalStorage } from "../../services/localStoreService";

const Wishlist = ({removeFromWishlist}) => {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (getFromLocalStorage('wishlist_collection')) {
      setProducts(getFromLocalStorage('wishlist_collection'));
    }
  }, []);

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item);
    let foundIncreaseItems = products.findIndex(value => value.id === item.id);
    products.splice(foundIncreaseItems, 1)
  };
  
  const wishlistProducts = products.map((item) => (
    <li key={item.id} className='wishlist-item'>
        
      <Figure.Caption className='wishlist-title'>
        <Link style={{ textDecoration: 'none' }} key={item.id} to={`/products/${item.id}`}>
          <h2 className="item-title">{item.title}</h2>
          <Figure.Image src={`/images/products/${item.images[0]}`} className='wishlist-img'/>
        </Link>

        <span className="item-description">
        <ReadMoreReact text={item.description}
          min={60}
          ideal={100}
          max={10000}
          readMoreText="..."/> 
            
        <span className='full-description-wishlist'>{item.description}</span>

        </span>
      </Figure.Caption>
      
      <FontAwesomeIcon
          icon = {faTrash}
          className="delte-wishlist-button"
          onClick={() => {handleRemoveFromWishlist(item)}}/>
    </li>
  ))

  return (
    <div className='main-wishlist'>
      <h5>
        {products.length < 1 && 
        <div>
          <p className='empty-cart-p'>
            Your wishlist is empty.  
            <Link style={{ textDecoration: 'none' }} key='shop-now' to={`/`}>
             <span className='shop-now'>Wish Now </span>
            </Link>
            </p>
          <div className='empty-cart'><img src='/images/empty-basket.png' alt='Your cart is empty'></img><br/>
          <Link style={{ textDecoration: 'none' }} key='shop-now-btn' to={`/`}>
          <Button
            variant="dark"
            className='cart-btns shop-now-btn'
          ><span>Wish Now</span>
          </Button>
          </Link>
          </div>
        </div>}
      </h5>
      <ul className='wishlist-wrap'>
        {wishlistProducts}
      </ul>
    </div>
  )
};

const mapStateToProps = ({wishlistReducer: {products}}) => ({products});

export default connect(mapStateToProps, {addToWishlist,removeFromWishlist})(Wishlist);

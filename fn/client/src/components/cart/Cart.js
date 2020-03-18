import React, { useState, useEffect } from 'react';
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";

import {increaseToCart, decreaseFromCart, removeFromCart} from '../../actions'

const Cart = ({products, increaseToCart, decreaseFromCart, removeFromCart}) => {
  console.log(products);

  const [product, setProduct] = useState(products)

  const removeFromCart1 = (id) => {
    const newProducts = products.map(el=>
      el.id === id ? products.splice(products.indexOf(el), 1) : el
    );
    setProduct(newProducts)
  }

  const increaseToCart1 = (id) => {
    const newProducts = products.map(el=>
      el.id === id ? {...el, quantity: el.quantity++} : el
    );
    setProduct(newProducts)
  };

  const decreaseFromCart1 = (id) => {
    const newProducts = products.map(el=>
      el.id === id && el.quantity > 1 ? {...el, quantity: el.quantity--} : 
      el.id === id && el.quantity === 1 ? removeFromCart(el.id) : 
      el
    );
    setProduct(newProducts)
  }


  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{products.length < 1 && <em> Please add some products to cart.</em>}</h5>
      <ul className='cart-wrap'>
        {products.map((item) => (
          <li key={item.id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${item.images[0]}`} className='cartImg'/>
                <Figure.Caption className='cartTitle'>
                  {item.title}
                  <p> Price: {item.price * item.quantity}</p>
                  <button
                    className="remove-from-cart-button"
                    onClick={() => {decreaseFromCart1(item.id); decreaseFromCart(item.id)}}>
                        -
                  </button>
                  <span id="quantity"> {item.quantity} </span>
                  <button
                    className="add-to-cart-button"
                    onClick={() => {increaseToCart1(item.id); increaseToCart(item.id)}}>
                        +
                  </button>
                  <button
                    className="delte-cart-button"
                    onClick={() => {removeFromCart1(item.id); removeFromCart(item.id)}}>
                        delete
                  </button>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
      </ul>
    </div>
  )
};

const mapStateToProps = ({cartReducer: {products, cartNumbers}}) => ({products, cartNumbers});

export default connect(mapStateToProps, {increaseToCart, decreaseFromCart, removeFromCart})(Cart);



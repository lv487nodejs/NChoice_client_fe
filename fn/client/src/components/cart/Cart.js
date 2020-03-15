import React from 'react';
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";

const Cart = ({cartProps}) => {
  let cart = new Map();
  for (let product of cartProps.products) {
    let foundProduct = cart.get(product.id);
    if (foundProduct) {
      foundProduct.quantity++;
    } else {
      cart.set(product.id, {product, "quantity": 1})
    }
  }

  console.log("=======");
  console.log(cart);

  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{cart.size < 1 && <em> Please add some products to cart.</em> }</h5>
      <ul className='cart-wrap'>
        {Array.from(cart).map(([key, value]) => (
          <li key={key} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${value.product.images[0]}`} className='cartImg'/>
                <Figure.Caption className='cartTitle'>
                  {value.product.title}
                  <p> Price: {value.product.price * value.quantity} {value.product.currencyIcon}</p>
                  <p> Quantity: {value.quantity}</p>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
      </ul>
    </div>
  )
};

const mapStateToProps = state => ({
  cartProps: state.cartState
});

export default connect(mapStateToProps)(Cart);



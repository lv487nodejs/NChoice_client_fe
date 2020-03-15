import React from 'react';
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";

const Cart = ({cartProps}) => {
  console.log(cartProps.products);

  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{cartProps.products.length < 1 && <em> Please add some products to cart.</em> }</h5>
      <ul className='cart-wrap'>
        {cartProps.products.map((value) => (
          <li key={value.id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${value.images[0]}`} className='cartImg'/>
                <Figure.Caption className='cartTitle'>
                  {value.title}
                  <p> Price: {value.price * value.quantity} {value.currencyIcon}</p>
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



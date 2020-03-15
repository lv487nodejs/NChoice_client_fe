import React from 'react';
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";

const Cart = ({products}) => {
  console.log(products);

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
                  <p> Price: {item.price * item.quantity} {item.currencyIcon}</p>
                  <p> Quantity: {item.quantity}</p>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
      </ul>
    </div>
  )
};

const mapStateToProps = ({cartReducer: {products}}) => ({products});

export default connect(mapStateToProps)(Cart);



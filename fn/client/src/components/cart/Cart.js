import React, { useState } from 'react';
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import { Link } from 'react-router-dom';
import { Figure, Button } from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { increaseToCart, decreaseFromCart, removeFromCart } from '../../actions'

const Cart = ({ products, increaseToCart, decreaseFromCart, removeFromCart }) => {
  const [product, setProduct] = useState(products)

  const removeFromCart1 = (id) => {
    const newProducts = products.map(el =>
      el.id === id ? products.splice(products.indexOf(el), 1) : el
    );
    setProduct(newProducts)
  }

  const increaseToCart1 = (id) => {
    const newProducts = products.map(el =>
      el.id === id ? { ...el, quantity: el.quantity++ } : el
    );
    setProduct(newProducts)
  };

  const decreaseFromCart1 = (id) => {
    const newProducts = products.map(el =>
      el.id === id && el.quantity > 1 ? { ...el, quantity: el.quantity-- } :
        el.id === id && el.quantity === 1 ? removeFromCart1(el.id) :
          el
    );
    setProduct(newProducts)
  }

  const salePrices = []
  const fullPrices = []
  products.map(i => {
    const price = i.price * i.quantity
    return salePrices.push(price)
  })
  products.map(i => {
    const price = i.msrp * i.quantity
    return fullPrices.push(price)
  })

  const fullPrice =
    fullPrices.length === 1 ? fullPrices[0] :
      fullPrices.length > 1 ? fullPrices.reduce((accumulator, currentValue) => accumulator + currentValue) :
        0

  const total =
    salePrices.length === 1 ? salePrices[0] :
      salePrices.length > 1 ? salePrices.reduce((accumulator, currentValue) => accumulator + currentValue) :
        0

  const sale = fullPrice - total

  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{products.length < 1 && <em> Please add some products to cart.</em>}</h5>
      <ul className='cart-wrap'>
        {products.map((item) => (
          <li key={item.id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${item.images[0]}`} className='cart-img' />
                <Figure.Caption className='cart-title'>
                  {item.title}
                  <p> Price:
                  <span className="price">{item.price * item.quantity} {item.currencyIcon}</span>
                    <span className="msrp-price">{item.msrp * item.quantity} {item.currencyIcon}</span>
                  </p>
                  <p> Size: <span>{item.size}</span> </p>
                  <div className="quantity-control">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="remove-from-cart-button"
                      onClick={() => { decreaseFromCart1(item.id); decreaseFromCart(item.id) }} />
                    <span id="quantity"> {item.quantity} </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="add-to-cart-button"
                      onClick={() => { increaseToCart1(item.id); increaseToCart(item.id) }} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delte-cart-button"
                      onClick={() => { removeFromCart1(item.id); removeFromCart(item.quantity) }} />
                    <Link to="/checkout">
                      <Button
                        variant="dark"
                      >Buy now</Button>
                    </Link>
                  </div>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
        <h5>{products.length >= 1 && <em>Total: {total}</em>}</h5>
        <h5>{products.length >= 1 && <em>Sale: {sale}</em>}</h5>
      </ul>
    </div>
  )
};

const mapStateToProps = ({ cartReducer: { products } }) => ({ products });

export default connect(mapStateToProps, { increaseToCart, decreaseFromCart, removeFromCart })(Cart);



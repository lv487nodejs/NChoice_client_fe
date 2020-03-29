import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import { increaseToCart, decreaseFromCart, removeFromCart, addToCart } from "../../actions";

const Cart = ({ increaseToCart, decreaseFromCart, removeFromCart}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('products-collection')) {
      setProducts(JSON.parse(localStorage.getItem('products-collection')));
    }
  }, [increaseToCart, decreaseFromCart, removeFromCart]);

  const handleIncreaseToCart = (item) => {
    increaseToCart(item);
    let foundIncreaseItems = products.find(value => value.id === item.id);
    foundIncreaseItems.quantity += 1;
  };

  const handleDecreaseFromCart = (item) => {
    let foundIncreaseItems = products.find(value => value.id === item.id);
    let foundToRemove = products.findIndex(value => value.id === item.id);
    if (foundIncreaseItems.quantity === 1) {
      products.splice(foundToRemove, 1);
    } else {
      foundIncreaseItems.quantity -= 1;
    }
    decreaseFromCart(item);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    let foundIncreaseItems = products.findIndex(value => value.id === item.id);
    products.splice(foundIncreaseItems, 1)
  };

  const salePrices = [];
  const fullPrices = [];
  products.map(i=>{
    const price = i.price * i.quantity;
    return salePrices.push(price)
  });

  products.map(i=>{
    const price = i.msrp * i.quantity;
    return fullPrices.push(price)
  });

  const fullPrice =
   fullPrices.length === 1 ? fullPrices[0] :
   fullPrices.length > 1 ? fullPrices.reduce((accumulator, currentValue) => accumulator + currentValue) :
   0;

  const total =
   salePrices.length === 1 ? salePrices[0] :
   salePrices.length > 1 ? salePrices.reduce((accumulator, currentValue) => accumulator + currentValue) :
   0;

  const sale = fullPrice - total;

  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{products.length < 1 && <em> Please add some products to cart.</em>}</h5>
      <ul className='cart-wrap'>
        {products.map((item) => (
          <li key={item.id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${item.images[0]}`} className='cart-img'/>
                <Figure.Caption className='cart-title'>
                  {item.title}
                  <p> Price:
                  <span className="price">{item.price * item.quantity} {item.currencyIcon}</span>
                  <span className="msrp-price">{item.msrp * item.quantity} {item.currencyIcon}</span>
                  </p>
                  <p> Size: <span>{item.propetries.size[0]}</span> </p>
                  <div className="quantity-control">
                  <FontAwesomeIcon
                    icon = {faMinus}
                    className="remove-from-cart-button"
                    onClick={() => handleDecreaseFromCart(item)}/>
                  <span id="quantity"> {item.quantity} </span>
                  <FontAwesomeIcon
                    icon = {faPlus}
                    className="add-to-cart-button"
                    onClick ={() => handleIncreaseToCart(item)}/>
                  <FontAwesomeIcon
                    icon = {faTrash}
                    className="delte-cart-button"
                    onClick={() => handleRemoveFromCart(item)}/>
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

const mapStateToProps = ({cartReducer: {products, cartNumbers}}) => ({products, cartNumbers});

export default connect(mapStateToProps, {addToCart, increaseToCart, decreaseFromCart, removeFromCart})(Cart);



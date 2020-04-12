import React from "react";
import { connect } from "react-redux";
import './Cart.css'
import { Link } from 'react-router-dom';
import { Figure, Button } from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { increaseToCart, decreaseFromCart, removeFromCart, addToCart } from "../../actions";

const Cart = ({cartProducts, increaseToCart, decreaseFromCart, removeFromCart, currencyIcon, currency}) => {
  
  const handleIncreaseToCart = (item) => () =>{
    increaseToCart(item);
  };

  const handleDecreaseFromCart = (item) => () => {
    decreaseFromCart(item);
  };

  const handleRemoveFromCart = (item) => () => {
    removeFromCart(item);
  };

  const salePrices = cartProducts.map(i => {
    return i.price * i.quantity * currency;
  });

  const fullPrices = cartProducts.map(i => {
    return i.mrsp * i.quantity * currency;
  });

  const fullPrice = parseFloat(fullPrices.length > 0 ? 
          fullPrices.reduce((accumulator, currentValue) => accumulator + +currentValue) :
          0).toFixed(2)

  const total = parseFloat(salePrices.length > 0 ? 
          salePrices.reduce((accumulator, currentValue) => accumulator + +currentValue) :
          0).toFixed(2)

  return (
    <div className='main-cart'>
      <h3>Cart</h3>
      <h5>{cartProducts.length < 1 && <em> Please add some products to cart.</em>}</h5>
      <ul className='cart-wrap'>
        {cartProducts.map((item) => (
          <li key={item.propetries._id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${item.images[0]}`} className='cart-img' />
                <Figure.Caption className='cart-title'>
                  {item.title}
                  <p> Price:
                  <span className="price">{(parseFloat(item.price * currency * item.quantity).toFixed(2))} {currencyIcon}</span>
                  <span className="msrp-price">{(parseFloat(item.mrsp * currency * item.quantity).toFixed(2))} {currencyIcon}</span>
                  </p>
                  <p> Size: <span>{item.propetries.size[0]}</span> </p>
                  <div className="quantity-control">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="remove-from-cart-button"
                      onClick={handleDecreaseFromCart(item)} />
                    <span id="quantity"> {item.quantity} </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="add-to-cart-button"
                      onClick={handleIncreaseToCart(item)} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delte-cart-button"
                      onClick={handleRemoveFromCart(item)} />
                  </div>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
        <div className='checkout-wrap'>
          <h5>{cartProducts.length >= 1 && <em>Total: {(parseFloat(total).toFixed(2))} {currencyIcon} </em>} </h5>
          <h5>{cartProducts.length >= 1 && <em>Save: {(parseFloat(fullPrice - total).toFixed(2))} {currencyIcon}</em>} </h5>
          <Link to="/checkout" className={cartProducts.length >= 1 ? 'disp-block' : 'disp-none' }>
            <Button
              variant="dark"
            >Go to checkout</Button>
          </Link>
        </div>
      </ul>
    </div>
  )
};

const mapStateToProps =
  ({cartReducer: {cartProducts}, productsList: { currency, currencyIcon } }) =>
  ({cartProducts, currency, currencyIcon });

const mapDispatchToProps = { addToCart, increaseToCart, decreaseFromCart, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

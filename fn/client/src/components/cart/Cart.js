import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import './Cart.css'
import { Link } from 'react-router-dom';
import { Figure, Button } from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { increaseToCart, decreaseFromCart, removeFromCart, addToCart } from "../../actions";

const Cart = ({cartProducts, increaseToCart, decreaseFromCart, removeFromCart, currencyIcon, currency}) => {
  const [products, setProducts] = useState(cartProducts)

  useEffect(() => {
    if (localStorage.getItem('products-collection')) {
      setProducts(JSON.parse(localStorage.getItem('products-collection')));
    }
  }, []);

  const handleIncreaseToCart = (item) => {
    increaseToCart(item);
    let foundIncreaseItems = products.find(value => value.propetries._id === item.propetries._id);
    foundIncreaseItems.quantity += 1;
  };

  const handleDecreaseFromCart = (item) => {
    let foundIncreaseItems = products.find(value => value.propetries._id === item.propetries._id);
    let foundToRemove = products.findIndex(value => value.propetries._id === item.propetries._id);
    if (foundIncreaseItems.quantity === 1) {
      products.splice(foundToRemove, 1);
    } else {
      foundIncreaseItems.quantity -= 1;
    }
    decreaseFromCart(item);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    let foundIncreaseItems = products.findIndex(value => value.propetries._id === item.propetries._id);
    products.splice(foundIncreaseItems, 1)
  };

  const salePrices = [];
  const fullPrices = [];
  products.map(i => {
    const price = i.price * i.quantity;
    return salePrices.push(price)
  });

  products.map(i => {
    const price = i.mrsp * i.quantity;
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
          <li key={item.propetries._id} className='cart-item'>
            <Container>
              <Row>
                <Figure.Image src={`/images/products/${item.images[0]}`} className='cart-img' />
                <Figure.Caption className='cart-title'>
                  {item.title}
                  <p> Price:
                  <span className="price">{item.price * currency * item.quantity} {currencyIcon}</span>
                  <span className="msrp-price">{item.mrsp * currency * item.quantity} {currencyIcon}</span>
                  </p>
                  <p> Size: <span>{item.propetries.size[0]}</span> </p>
                  <div className="quantity-control">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="remove-from-cart-button"
                      onClick={() => handleDecreaseFromCart(item)} />
                    <span id="quantity"> {item.quantity} </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="add-to-cart-button"
                      onClick={() => handleIncreaseToCart(item)} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delte-cart-button"
                      onClick={() => handleRemoveFromCart(item)} />
                  </div>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
        <div className='checkout-wrap'>
          <h5>{products.length >= 1 && <em>Total: {total} {currencyIcon} </em>} </h5>
          <h5>{products.length >= 1 && <em>Sale: {sale} {currencyIcon}</em>} </h5>
          <Link to="/checkout" className={products.length >= 1 ? 'disp-block' : 'disp-none' }>
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

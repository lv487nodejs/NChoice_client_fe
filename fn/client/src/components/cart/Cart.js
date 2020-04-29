import React from "react";
import { connect } from "react-redux";
import './Cart.css'
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap'
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


  const tableRows = cartProducts.map(item =>

    <tr key={item.propetries._id} className='cart-item'>
      <td className='item1'>
        <Link key={item.id} to={`/products/${item.id}`}>
          <img
            className="cart-img"
            alt="order-item"
            src={`/images/products/${item.images}`}
          />
        </Link>
      </td>
      <td>
        <Link key={item.id} to={`/products/${item.id}`}>
          <p className='cart-title-item' >{item.title}</p>
        </Link>
        <p className='item-size-cart'> Size: <span>{item.propetries.size[0]}</span> </p>
      </td>
      <td>
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
        </div>
      </td>
      <td>
        <span className="price">{(parseFloat(item.price * currency * item.quantity).toFixed(2))} {currencyIcon}</span>
        <span className="full-price">{(parseFloat(item.mrsp * currency * item.quantity).toFixed(2))} {currencyIcon}</span>
      </td>
      <td>
        <FontAwesomeIcon
          icon={faTrash}
          className="delte-cart-button"
          onClick={handleRemoveFromCart(item)} />
      </td>
    </tr>
)

  return (
    <div className='main-cart'>
      
      <h5>
        {cartProducts.length < 1 && 
        <div>
          <p className='empty-cart-p'>
            Your cart is empty.  
            <Link style={{ textDecoration: 'none' }} key='shop-now' to={`/`}>
             <span className='shop-now'>Shop Now </span>
            </Link>
            </p>
          <div className='empty-cart'><img src='/images/empty-basket.png' alt='Your cart is empty'></img><br/>
          <Link style={{ textDecoration: 'none' }} key='shop-now-btn' to={`/`}>
          <Button
            variant="dark"
            className='cart-btns shop-now-btn'
          ><span>Shop Now</span>
          </Button>
          </Link>
          </div>
        </div>}
      </h5>


      <div>
      {cartProducts.length >= 1 && 
      <div>
      <h3 className='cart-name'>Cart</h3>
      <Table
        responsive
        className='cart-table'>
        <thead className='thead-cart'>
          <tr>
            <th>ITEM</th>
            <th></th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th></th>
          </tr> 
        </thead>
        <tbody>
          {tableRows}
        </tbody>
        </Table>
  
        <div className='total-cart'>
          <h5 className='total-cart'>{cartProducts.length >= 1 && <>TOTAL: {(parseFloat(total).toFixed(2))} {currencyIcon} </>} </h5>
          <h5 className='total-cart'>{cartProducts.length >= 1 && <>SAVE: {(parseFloat(fullPrice - total).toFixed(2))} {currencyIcon}</>} </h5>
        </div>
        
        <div className='checkout-cart-button-div'>
          <Link to="/" className={cartProducts.length >= 1 ? 'checkout-cart-button' : 'disp-none' }>
          <Button
            variant="dark"
            className='cart-btns'
          >Continue shopping</Button>
          </Link>
          <Link to="/checkout" className={cartProducts.length >= 1 ? 'checkout-cart-button' : 'disp-none' }>
          <Button
            variant="dark"
            className='cart-btns'
          >Go to checkout</Button>
          </Link>
        </div>
      </div>}
      </div>
    </div>
  )
};

const mapStateToProps =
  ({cartReducer: {cartProducts}, productsList: { currency, currencyIcon } }) =>
  ({cartProducts, currency, currencyIcon });

const mapDispatchToProps = { addToCart, increaseToCart, decreaseFromCart, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

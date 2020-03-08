import React, {useEffect} from 'react';
import {getNumbers} from "../../actions";
import connect from "react-redux/es/connect/connect";
import './Cart.css'

const Cart = (props) => {

  useEffect(() => {
    getNumbers()
  }, []);

  return (
    <h3 className='cart-wrap'>
      {props.cartProps.cartNumbers === 0 ? 'Your Cart is Empty!' : 'Your Cart is NOT Empty!'}
    </h3>
  )
};

const mapStateToProps = state => ({
  cartProps: state.cartState
});

export default connect(mapStateToProps, {getNumbers})(Cart);



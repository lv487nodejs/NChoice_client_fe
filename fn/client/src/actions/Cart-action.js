const addCart = (productName) => {
  return (dispatch) => {
    console.log('Adding to cart');
    console.log('Product: ', productName );

    dispatch({
      type: 'ADD_PRODUCT_CART',
      payload: productName
    })
  }
};

const getNumbers = () => {
  return (dispatch) =>{
    console.log('Getting all numbers from cart');
    dispatch({
      type: 'GET_NUMBERS_CART'
    })
  }
};


const increaseToCart = (id) => {
  return(dispatch) => {
    dispatch({
      type: 'INCREASE_TO_CART',
      payload: id
    })
  }
};

const decreaseFromCart = (id) => {
  return(dispatch) => {
    dispatch({
      type: 'DECREASE_TO_CART',
      payload: id
    })
  }
};

const removeFromCart = (id) => {
  return(dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    })
  }
};


export  {addCart, getNumbers, increaseToCart, decreaseFromCart, removeFromCart}




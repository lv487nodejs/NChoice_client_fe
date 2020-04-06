const addToCart = (productName) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: productName
    })
  }
};

const increaseToCart = (productName) => {
  return(dispatch) => {
    dispatch({
      type: 'INCREASE_TO_CART',
      payload: productName
    })
  }
};

const decreaseFromCart = (productName) => {
  return(dispatch) => {
    dispatch({
      type: 'DECREASE_TO_CART',
      payload: productName
    })
  }
};

const removeFromCart = (productName) => {
  return(dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productName
    })
  }
};

export  {
  addToCart,
  increaseToCart,
  decreaseFromCart,
  removeFromCart,
}




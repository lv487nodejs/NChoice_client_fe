const addToCart = (productName) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: productName
    })
  }
};

const getNumbers = () => {
  return (dispatch) =>{
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

const removeFromCart = (quantity) => {
  return(dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: quantity
    })
  }
};


export  {
  addToCart,
  getNumbers, 
  increaseToCart, 
  decreaseFromCart, 
  removeFromCart,
}




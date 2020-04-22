const addToCart = (productName) => {
  return {
      type: 'ADD_PRODUCT_TO_CART',
      payload: productName    
  }
};

const setCart = newCart => {
  return {
    type: 'SET_CART',
    payload: newCart
  }
}

const increaseToCart = (productName) => {
  return{
      type: 'INCREASE_TO_CART',
      payload: productName    
  }
};

const decreaseFromCart = (productName) => {
  return{
      type: 'DECREASE_TO_CART',
      payload: productName    
  }
};

const removeFromCart = (productName) => {
  return{
      type: 'REMOVE_FROM_CART',
      payload: productName
  }
};

const clearCart = () => {
  return{
      type: 'CLEAR_CART',
  }
};

export  {
  addToCart,
  setCart,
  increaseToCart,
  decreaseFromCart,
  removeFromCart,
  clearCart
}




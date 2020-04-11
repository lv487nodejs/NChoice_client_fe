const addToCart = (productName) => {
  return {
      type: 'ADD_PRODUCT_TO_CART',
      payload: productName    
  }
};

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
  increaseToCart,
  decreaseFromCart,
  removeFromCart,
  clearCart
}




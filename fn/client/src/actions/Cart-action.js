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
export  {addCart, getNumbers}




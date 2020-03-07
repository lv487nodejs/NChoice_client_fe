// const productAddedToCart = wishItem => ({
//   type: 'PRODUCT_ADDED_TO_CART',
//   payload: wishItem,
// });
//
// const productRemovedFromCart = wishItem => ({
//   type: 'PRODUCT_REMOVED_FROM_CART',
//   payload: wishItem,
// });
//
// const allproductsRemovedFromCart = wishItem => ({
//   type: 'ALL_PRODUCTS_REMOVED_FROM_CART',
//   payload: wishItem,
// });
//
// export { productAddedToCart, productRemovedFromCart, allproductsRemovedFromCart };

const addCart = () => {
  return (dispatch) =>{
    console.log('Adding to cart');
    dispatch({
      type: 'ADD_PRODUCT_CART'
    })
  }
};

const getNumbers =() => {
  return (dispatch) =>{
    console.log('Getting all numbers from cart');
    dispatch({
      type: 'GET_NUMBERS_CART'
    })
  }
};
export  {addCart, getNumbers}




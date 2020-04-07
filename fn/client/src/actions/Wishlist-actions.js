const addToWishlist = (productDescription) => {
    return (dispatch) => {
      dispatch({
        type: 'ADD_PRODUCT_WISHLIST',
        payload: productDescription
      })
    }
  };
const removeFromWishlist = (productName) => {
  return(dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: productName
    })
  }
};

export {addToWishlist, removeFromWishlist}

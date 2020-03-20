const addToWishlist = (productDescription) => {
    return (dispatch) => {
      dispatch({
        type: 'ADD_PRODUCT_WISHLIST',
        payload: productDescription
      })
    }
  };

export {addToWishlist}
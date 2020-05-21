const addToWishlist = (productDescription) => {
  return {
    type: "ADD_PRODUCT_WISHLIST",
    payload: productDescription
  };
};

const removeFromWishlist = (productName) => {
  return {
    type: "REMOVE_FROM_WISHLIST",
    payload: productName
  };
};

export { addToWishlist, removeFromWishlist };


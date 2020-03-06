const productAddedToCart = bookId => ({
    type: 'PRODUCT_ADDED_TO_CART',
    payload: bookId,
});

const productRemovedFromCart = bookId => ({
    type: 'PRODUCT_REMOVED_FROM_CART',
    payload: bookId,
});

const allproductsRemovedFromCart = bookId => ({
    type: 'ALL_PRODUCTS_REMOVED_FROM_CART',
    payload: bookId,
});

export { productAddedToCart, productRemovedFromCart, allproductsRemovedFromCart };

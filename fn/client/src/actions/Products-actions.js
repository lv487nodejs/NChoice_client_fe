const productsLoaded = newProducts => ({
    type: 'PRODUCTS_LOADED',
    payload: newProducts,
});

const productsRequested = () => ({
    type: 'PRODUCTS_REQUESTED',
});

export { productsLoaded, productsRequested };

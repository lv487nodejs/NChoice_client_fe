const productsLoaded = newProducts => ({
    type: 'PRODUCTS_LOADED',
    payload: newProducts,
});

const productLoaded = newProduct => ({
    type: 'PRODUCT_LOADED',
    payload: newProduct,
});

const productsRequested = () => ({
    type: 'PRODUCTS_REQUESTED',
});

const currencyChange = newCurrency => ({
    type: 'CURRENCY_CHANGE',
    payload: newCurrency,
});

export { productsLoaded, productLoaded, productsRequested, currencyChange };

const productsLoaded = newProducts => ({
    type: 'PRODUCTS_LOADED',
    payload: newProducts,
});

const productsRequested = () => ({
    type: 'PRODUCTS_REQUESTED',
});

const currencyChange = newCurrency => ({
    type: 'CURRENCY_CHANGE',
    payload: newCurrency,
});

export { productsLoaded, productsRequested, currencyChange };

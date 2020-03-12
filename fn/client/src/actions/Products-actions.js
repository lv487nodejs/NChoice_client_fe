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
const colorLoaded = newColor => ({
    type: 'COLOR_LOADED',
    payload: newColor,
});

export { productsLoaded, productLoaded, productsRequested, currencyChange, colorLoaded };

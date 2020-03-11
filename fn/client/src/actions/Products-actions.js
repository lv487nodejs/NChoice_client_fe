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
const addSortByPrice = value => ({
    type: 'SORT_BY_PRICE',
    payload: value,
});
export { productsLoaded, productsRequested, currencyChange, addSortByPrice };

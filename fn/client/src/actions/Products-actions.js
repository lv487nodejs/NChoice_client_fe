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
const addCurrentPage = value => ({ type: 'ADD_CURRENT_PAGE', payload: value });
const addPostsPerPage = value => ({ type: 'ADD_POSTS_PER_PAGE', payload: value });
const addPagesCount = value => ({ type: 'ADD_PAGES_COUNT', payload: value });

export { productsLoaded, productsRequested, currencyChange,addCurrentPage, addPagesCount, addPostsPerPage };

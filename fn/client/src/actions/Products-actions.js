const productsLoaded = newProducts => ({
    type: 'PRODUCTS_LOADED',
    payload: newProducts,
});

const productsRequested = () => ({
    type: 'PRODUCTS_REQUESTED',
});
const productLoaded = newProduct => ({
    type: 'PRODUCT_LOADED',
    payload: newProduct,
});
const currencyChange = newCurrency => ({
    type: 'CURRENCY_CHANGE',
    payload: newCurrency,
});
const addCurrentPage = value => ({
    type: 'ADD_CURRENT_PAGE',
    payload: value,
});
const addPostsPerPage = value => ({
    type: 'ADD_POSTS_PER_PAGE',
    payload: value,
});
const addPagesCount = value => ({
    type: 'ADD_PAGES_COUNT',
    payload: value,
});
const addSortByPrice = value => ({
    type: 'SORT_BY_PRICE',
    payload: value,
});
const sizesLoaded = newSize => ({
    type: 'SET_SIZES',
    payload: newSize,
});

const addSortByRating = value => ({
    type: 'SORT_BY_RATING',
    payload: value,
});

export {
    productsLoaded,
    productsRequested,
    currencyChange,
    addCurrentPage,
    addPostsPerPage,
    addPagesCount,
    addSortByPrice,
    productLoaded,
    sizesLoaded,
    addSortByRating
};

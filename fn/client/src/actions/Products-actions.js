const setProducts = newProducts => ({
    type: 'SET_PRODUCTS',
    payload: newProducts,
});

const productsLoadingStart = () => ({
    type: 'PRODUCTS_LOADING_START',
});

const productsLoadingStop = () => ({
    type: 'PRODUCTS_LOADING_STOP',
});
const setProduct = newProduct => ({
    type: 'SET_PRODUCT',
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

export {
    setProducts,
    productsLoadingStart,
    currencyChange,
    addCurrentPage,
    addPostsPerPage,
    addPagesCount,
    addSortByPrice,
    setProduct,
    sizesLoaded,
    productsLoadingStop,
};

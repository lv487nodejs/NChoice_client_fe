const setProduct = newProduct => ({
    type: 'SET_PRODUCT',
    payload: newProduct,
});

const setProductPropetries = newProductPropetries => ({
    type: 'SET_PRODUCT_PROPETRIES',
    payload: newProductPropetries,
});

const setProducts = newProducts => ({
    type: 'SET_PRODUCTS',
    payload: newProducts,
});

const setProductsFilters = newFilters => ({
    type: 'SET_PRODUCTS_FILTERS',
    payload: newFilters,
});

const setProductLoadingStatus = () => ({
    type: 'SET_LOADING_STATUS',
});

export {
    setProduct,
    setProducts,
    setProductsFilters,
    setProductPropetries,
    setProductLoadingStatus,
};

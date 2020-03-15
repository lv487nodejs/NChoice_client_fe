const setProduct = newProduct => ({
    type: 'SET_PRODUCT',
    payload: newProduct,
});

const setProductsFilter = newFilter => ({
    type: 'SET_PRODUCTS_FILTER',
    payload: newFilter,
})

const setProducts = newProducts => ({
    type: 'SET_PRODUCTS',
    payload: newProducts,
});

const setProductPropetries = newPropetries => ({
    type: 'SET_PRODUCTS_PROPETRIES',
    payload: newPropetries,
});

const setProductOptions = newOptions => ({
    type: 'SET_PRODUCT_OPTIONS',
    payload: newOptions,
});

const setProductOptionsList = newOptionsList => ({
    type: 'SET_PRODUCT_OPTIONS_LIST',
    payload: newOptionsList,
});

const setNewProduct = newProduct => ({
    type: 'SET_NEW_PRODUCT',
    payload: newProduct,
});

const setNewPropetries = newPropetries => ({
    type: 'SET_NEW_PROPETRIES',
    payload: newPropetries,
});

const productLoadingStatus = () => ({
    type: 'LOADING_STATUS',
});

export {
    setProduct,
    setProducts,
    setProductsFilter,
    setProductPropetries,
    setProductOptions,
    setProductOptionsList,
    setNewProduct,
    setNewPropetries,
    productLoadingStatus,
};

const setProduct = newProduct => ({
    type: 'SET_PRODUCT',
    payload: newProduct,
});

const setProducts = newProducts => ({
    type: 'SET_PRODUCTS',
    payload: newProducts,
});

const setProductPropetries = newPropetries => ({
    type: 'SET_PRODUCTS_PROPETRIES',
    payload: newPropetries,
});

const productLoadingStatus = () => ({
    type: 'LOADING_STATUS',
});

export { setProduct, setProducts, setProductPropetries, productLoadingStatus };

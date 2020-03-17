const setNewProduct = newProduct => ({
    type: 'SET_NEW_PRODUCT',
    payload: newProduct,
});

const setNewPropetries = newPropetries => ({
    type: 'SET_NEW_PROPETRIES',
    payload: newPropetries,
});

const setOptions = newOptions => ({
    type: 'SET_OPTIONS',
    payload: newOptions,
});

export { setNewProduct, setNewPropetries, setOptions };

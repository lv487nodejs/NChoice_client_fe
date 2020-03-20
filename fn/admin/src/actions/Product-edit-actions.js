const setProductEdit = newProductEdit => ({
    type: 'SET_PRODUCT_EDIT',
    payload: newProductEdit,
});

const setProductPropetriesEdit = newPropetriesEdit => ({
    type: 'SET_PRODUCT_PROPETRIES_EDIT',
    payload: newPropetriesEdit,
});

const setProductGroupedPropetries = newPropetriesGroups => ({
    type: 'SET_PRODUCT_PROPETRIES_GROUPED',
    payload: newPropetriesGroups,
});

export { setProductEdit, setProductPropetriesEdit, setProductGroupedPropetries };

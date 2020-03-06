const setCategory = newCategory => ({
    type: 'SET_CATEGORY',
    payload: newCategory,
});

const setCategories = newCategories => ({
    type: 'SET_CATEGORIES',
    payload: newCategories,
});

const categoryLoadingStatus = () => ({
    type: 'LOADING_STATUS',
});

export { setCategory, setCategories, categoryLoadingStatus };

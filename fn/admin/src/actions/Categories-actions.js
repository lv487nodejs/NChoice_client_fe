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

const categorySnackbarOpenTrue = () => ({
    type: 'OPEN_TRUE',
});

const categorySnackbarOpenFalse = () => ({
    type: 'OPEN_FALSE',
});

export {
    setCategory,
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
};

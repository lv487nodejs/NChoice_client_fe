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

const categoryLoadingStop = () => ({
    type: 'LOADING_STOP',
});

const categorySnackbarOpenTrue = () => ({
    type: 'OPEN_TRUE',
});

const categorySnackbarOpenFalse = () => ({
    type: 'OPEN_FALSE',
});

const categoryUpdateCatalogs = catalogs => ({
    type: 'UPDATE_CATALOGS',
    payload: catalogs,
});

const setCatalogCheck = catalogCheck => ({
    type: 'SET_CATALOG_CHECK',
    payload: catalogCheck,
});

export {
    setCategory,
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
    categoryUpdateCatalogs,
    categoryLoadingStop,
    setCatalogCheck,
};

const setBrand = newBrand => ({
    type: 'SET_BRAND',
    payload: newBrand,
});

const setBrands = newBrands => ({
    type: 'SET_BRANDS',
    payload: newBrands,
});

const brandLoadingStatus = () => ({
    type: 'LOADING_STATUS',
});

const brandSnackbarOpenTrue = () => ({
    type: 'OPEN_TRUE',
});

const brandSnackbarOpenFalse = () => ({
    type: 'OPEN_FALSE',
});

export { setBrand, setBrands, brandLoadingStatus, brandSnackbarOpenTrue, brandSnackbarOpenFalse };

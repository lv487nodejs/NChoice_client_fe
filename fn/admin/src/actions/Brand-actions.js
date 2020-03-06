const brandsLoaded = newBrands => ({
    type: 'BRANDS_LOADED',
    payload: newBrands,
});

const brandsRequested = () => ({
    type: 'BRANDS_REQUESTED',
});

const brandLoaded = newBrand => ({
    type: 'BRAND_LOADED',
    payload: newBrand,
});

export { brandsLoaded, brandLoaded, brandsRequested };

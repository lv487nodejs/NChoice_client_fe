const filterAddBrand = brand => ({
    type: 'FILTER_ADD_BRAND',
    payload: brand,
});
const filterAddCategory = category => ({
    type: 'FILTER_ADD_CATEGORY',
    payload: category,
});
const filterAddColor = color => ({
    type: 'FILTER_ADD_COLOR',
    payload: color,
});
const filterRemoveColor = color => ({
    type: 'FILTER_REMOVE_COLOR',
    payload: color,
});
const filterRemoveBrand = brand => ({
    type: 'FILTER_REMOVE_BRAND',
    payload: brand,
});
const filterRemoveCategory = category => ({
    type: 'FILTER_REMOVE_CATEGORY',
    payload: category,
});

const fetchSuccessBrands = brands => ({ type: 'FETCH_SUCCESS_BRANDS', payload: brands });

const fetchSuccessCategories = categories => ({ type: 'FETCH_SUCCESS_CATEGORIES', payload: categories });

const fetchSuccessColors = colors => ({ type: 'FETCH_SUCCESS_COLORS', payload: colors });

const composeFilters = () => ({
    type: 'COMPOSE_FILTERS',
});

export {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    composeFilters,
    filterRemoveBrand,
    filterRemoveCategory,
    filterRemoveColor,
    fetchSuccessBrands,
    fetchSuccessCategories,
    fetchSuccessColors,
};

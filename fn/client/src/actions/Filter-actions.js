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

const filterByName = searchTerm => ({
    type: 'FILTER_BY_NAME',
    payload: searchTerm,
});
export {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveBrand,
    filterRemoveCategory,
    filterRemoveColor,
    filterByName,
};

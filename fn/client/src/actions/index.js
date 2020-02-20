const filterAddBrand = brand => ({
    type: 'FILTER_ADD_BRAND',
    payload: brand,
});
const filterRemoveBrand = brand => ({
    type: 'FILTER_REMOVE_BRAND',
    payload: brand,
});

const filterAddCategory = (category) => ({
    type: 'FILTER_ADD_CATEGORY',
    payload: category,
});
const filterRemoveCategory = (category) => ({
    type: 'FILTER_REMOVE_CATEGORY',
    payload: category,
});

export { filterAddBrand, filterRemoveBrand, filterAddCategory, filterRemoveCategory };

const filterAddBrand = (brand) => ({
  type: 'FILTER_ADD_BRAND',
  payload: brand,
});
const filterAddCategory = (category) => ({
  type: 'FILTER_ADD_CATEGORY',
  payload: category,
});
const filterAddColor = (color) => ({
  type: 'FILTER_ADD_COLOR',
  payload: color,
});
const filterRemoveColor = (color) => ({
  type: 'FILTER_REMOVE_COLOR',
  payload: color,
});
const filterRemoveBrand = (brand) => ({
  type: 'FILTER_REMOVE_BRAND',
  payload: brand,
});
const filterRemoveAllBrands = () => ({
  type: 'FILTER_REMOVE_ALL_BRANDS'
});
const filterRemoveCategory = (category) => ({
  type: 'FILTER_REMOVE_CATEGORY',
  payload: category,
});
const filterRemoveAllCategories = () => ({
  type: 'FILTER_REMOVE_ALL_CATEGORIES',
});

const filterByName = (newSearchTerm) => ({
  type: 'FILTER_BY_NAME',
  payload: newSearchTerm,
});
const setSearchValue = (newSearchValue) => ({
  type: 'CLEAR_FIELD',
  payload: newSearchValue,
});

export {
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveAllBrands,
  filterRemoveCategory,
  filterRemoveAllCategories,
  filterRemoveColor,
  filterByName,
  setSearchValue,
};

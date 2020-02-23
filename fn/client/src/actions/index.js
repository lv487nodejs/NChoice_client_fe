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

const composeFilters = () => {
    return {
        type: 'COMPOSE_FILTERED'
    }
}
const productsFetchSuccess = (items) => {
    return {
        type: 'PRODUCTS_FETCH_SUCCESS',
        payload: items
    }
}
const productsFetchData = (dispatch) => (url, method = null, body = {}) => {
    fetch(url, method, body).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response
    })
    .then((response) => response.json())
    .then((items) => dispatch(productsFetchSuccess(items))).catch((err) => { throw new Error(err); }
    );
}

export { filterAddBrand, filterRemoveBrand, filterAddCategory, filterRemoveCategory, composeFilters, productsFetchData };

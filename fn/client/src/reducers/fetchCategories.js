
export function fetchCategories(state = [], action) {
    console.log('action', action);

    switch (action.type) {
        case 'PRODUCTS_FETCH_SUCCESS':
            return [...action.payload];

        default:
            return state;
    }
}

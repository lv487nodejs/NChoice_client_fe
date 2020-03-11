const initialState = {
    products: [],
    product: {},
    currency: 1,
    loading: true,
    sortByPrice: 0,
};

const productsList = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_REQUESTED':
            return {
                ...state,
                loading: true,
            };

        case 'PRODUCTS_LOADED':
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case 'CURRENCY_CHANGE':
            return {
                ...state,
                currency: action.payload,
                loading: false,
            };
        case 'SORT_BY_PRICE':
            return {
                ...state,
                sortByPrice: action.payload,
            };
        default:
            return state;
    }
};

export default productsList;

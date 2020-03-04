const initialState = {
    products: [{name: 1}],
    product: {},
    currency: 1,
    loading: true,
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

        default:
            return state;
    }
};

export default productsList;

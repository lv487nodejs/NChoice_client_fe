const initialState = {
    products: [],
    product: {},
    currency: 1,
    loading: true,
};

const productsList = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_REQUESTED':
            return {
                products: state.products,
                product: state.product,
                loading: true,
            };

        case 'PRODUCTS_LOADED':
            return {
                products: action.payload,
                product: state.product,
                loading: false,
            };

        case 'PRODUCT_LOADED':
            return {
                products: state.products,
                product: action.payload,
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

import { FILTER_OPTIONS } from '../config';

const filters = FILTER_OPTIONS;

const initialState = {
    product: {},
    productPropetries: [],
    products: [],
    filters,
    loading: true,
};

const productsState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADING_STATUS':
            return {
                ...state,
                loading: true,
            };

        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.payload,
                loading: false,
            };

        case 'SET_PRODUCT_PROPETRIES':
            return {
                ...state,
                productPropetries: action.payload,
                loading: false,
            };

        case 'SET_PRODUCTS_FILTERS':
            return {
                ...state,
                filters: action.payload,
            };

        default:
            return state;
    }
};

export default productsState;

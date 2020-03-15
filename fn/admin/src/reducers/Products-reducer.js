import { NEW_PRODUCT_MODEL, NEW_PRODUCT_PROPETRIES } from '../config';

const newProduct = NEW_PRODUCT_MODEL;
const newPropetries = NEW_PRODUCT_PROPETRIES;

const initialState = {
    filter: {},
    products: [],
    product: {},
    productPropetries: [],
    newProduct,
    newPropetries,
    productOptions: [],
    productOptionsList: {},
    loading: true,
};

const productsState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {
                ...state,
                loading: true,
            };

        case 'SET_PRODUCTS_FILTER':
            return {
                ...state,
                filter: action.payload,
            };

        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.payload,
                loading: false,
            };

        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case 'SET_PRODUCTS_PROPETRIES':
            return {
                ...state,
                productPropetries: action.payload,
                loading: false,
            };

        case 'SET_NEW_PRODUCT':
            return {
                ...state,
                newProduct: action.payload,
            };

        case 'SET_NEW_PROPETRIES':
            return {
                ...state,
                newPropetries: action.payload,
            };

        case 'SET_PRODUCT_OPTIONS':
            return {
                ...state,
                productOptions: action.payload,
                loading: false,
            };

        case 'SET_PRODUCT_OPTIONS_LIST':
            return {
                ...state,
                productOptionsList: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default productsState;

import { NEW_PRODUCT_MODEL, NEW_PRODUCT_PROPETRIES } from '../config';

const newProduct = NEW_PRODUCT_MODEL;
const newPropetries = NEW_PRODUCT_PROPETRIES;

const initialState = {
    newProduct,
    newPropetries,
    options: [],
    loading: true,
};

const newProductState = (state = initialState, action) => {
    switch (action.type) {
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

        case 'SET_OPTIONS':
            return {
                ...state,
                options: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default newProductState;

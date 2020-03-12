import { NEW_PRODUCT_MODEL } from '../config';

const newProduct = NEW_PRODUCT_MODEL;

const initialState = {
    newProduct,
};

const newProductState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NEW_PRODUCT':
            return {
                ...state,
                newProduct: action.payload,
            };

        default:
            return state;
    }
};

export default newProductState;

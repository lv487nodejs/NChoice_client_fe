import { NEW_PRODUCT_MODEL, NEW_PRODUCT_PROPETRIES } from '../config';

const productEdit = NEW_PRODUCT_MODEL;
const productPropetriesEdit = NEW_PRODUCT_PROPETRIES;

const initialState = {
    productEdit,
    productPropetriesEdit,
    productPropetriesEditGroups: [],
    loading: true,
};

const productEditState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_EDIT':
            return {
                ...state,
                productEdit: action.payload,
            };

        case 'SET_PRODUCT_PROPETRIES_EDIT':
            return {
                ...state,
                productPropetriesEdit: action.payload,
            };

        case 'SET_PRODUCT_PROPETRIES_GROUPED':
            return {
                ...state,
                productPropetriesEditGroups: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default productEditState;

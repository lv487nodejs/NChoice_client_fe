const initialState = {
    categories: [],
    category: {},
    loading: true,
    success: false,
};

const categoriesList = (state = initialState, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'CATEGORIES_SET':
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case 'CATEGORY_SET':
            return {
                ...state,
                category: action.payload,
                loading: false,
            };
        case 'SUCCESS_CHANGE':
            return {
                ...state,
                success: !action.payload,
            };
        default:
            return state;
    }
};

export default categoriesList;

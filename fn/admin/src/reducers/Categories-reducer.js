const initialState = {
    categories: [],
    category: {},
    loading: true,
};

const categoriesList = (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORIES_REQUESTED':
            return {
                ...state,
                loading: true,
            };
        case 'CATEGORIES_LOADED':
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case 'CATEGORY_LOADED':
            return {
                ...state,
                category: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default categoriesList;

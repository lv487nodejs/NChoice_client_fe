const initialState = {
    categories: [],
    category: {},
    loading: true,
    success: false,
};

const categoriesState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {
                ...state,
                loading: true,
            };

        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload,
                loading: false,
            };

        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default categoriesState;

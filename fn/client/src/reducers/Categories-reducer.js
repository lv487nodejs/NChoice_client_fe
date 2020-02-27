const initialState = {
    categories: [],
    catalog: {},
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORIES_LOADED':
            return {
                categories: action.payload,
            };

        default:
            return state;
    }
};

export default categoriesReducer;

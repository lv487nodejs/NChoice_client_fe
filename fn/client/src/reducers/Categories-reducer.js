const initialState = {
    categories: [],
    category: {},
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORIES_LOADED':
            return {
                categories: action.payload,
            };

        default:
            return state;
    }
};

export default categories;

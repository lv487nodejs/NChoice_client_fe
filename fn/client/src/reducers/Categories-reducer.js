const initialState = {
    categories: [],
    catalog: {},
};

const categories = (state = initialState, action) => {
    console.log(action.type)
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

const initialState = {
    products: [],
    product: {},
    currency: 1,
    loading: true,
    currentPage: 1,
    postsPerPage: 15,
};

const productsList = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_REQUESTED':
            return {
                ...state,
                loading: true,
            };

        case 'PRODUCTS_LOADED':
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case 'CURRENCY_CHANGE':
            return {
                ...state,
                currency: action.payload,
                loading: false,
            };
        case 'ADD_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'ADD_POSTS_PER_PAGE':
            return {
                ...state,
                postsPerPage: action.payload,
            };
        case 'ADD_PAGES_COUNT':
            return {
                ...state,
                pagesCount: action.payload,
            };
        default:
            return state;
    }
};

export default productsList;

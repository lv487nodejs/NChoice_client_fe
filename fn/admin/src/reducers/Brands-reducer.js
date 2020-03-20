const initialState = {
    brands: [],
    brand: '',
    loading: true,
    open: false,
};

const brandsState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {
                ...state,
                loading: true,
            };

        case 'SET_BRAND':
            return {
                ...state,
                brand: action.payload,
                loading: false,
            };

        case 'SET_BRANDS':
            return {
                ...state,
                brands: action.payload,
                loading: false,
            };
        case 'OPEN_TRUE':
            return {
                ...state,
                open: true,
            };
        case 'OPEN_FALSE':
            return {
                ...state,
                open: false,
            };

        default:
            return state;
    }
};

export default brandsState;

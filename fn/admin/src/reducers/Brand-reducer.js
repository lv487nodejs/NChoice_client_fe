const initialState = {
    brands: [],
    brand: '',
    loading: true,
};

const brandsList = (state = initialState, action) => {
    switch (action.type) {
        case 'BRANDS_REQUESTED':
            return {
                brands: state.brands,
                brand: state.brand,
                loading: true,
            };
        case 'BRANDS_LOADED':
            return {
                brands: action.payload,
                brand: state.brand,
                loading: false,
            };
        case 'BRAND_LOADED':
            return {
                brands: state.brands,
                brand: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default brandsList;

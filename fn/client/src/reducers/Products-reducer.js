
const initialState = {
    products: [{ name: 1 }],
    product: {},
    loading: true,
    brand: [],
    category: [],
    color: [],
    receivedBrands: [],
    receivedCategories: [],
    receivedColors: [],
};


const products = (state = initialState, action) => {    

    switch (action.type) {
        case 'PRODUCTS_REQUESTED':
            return {
                products: state.products,
                product: state.product,
                loading: true,
            };
        case 'PRODUCTS_LOADED':
            return {
                products: action.payload,
                product: state.product,
                loading: false,
            };

        default:
            return state;
    }
};

export default products;

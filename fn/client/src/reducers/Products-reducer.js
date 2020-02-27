const initialState = {
    products: [{name: 1}],
    product: {},
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_LOADED':
            return {
                products: action.payload,
            };

        default:
            return state;
    }
};

export default products;

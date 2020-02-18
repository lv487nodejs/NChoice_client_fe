import filterItems from './filterItems'

const initialState = {
    productList: [
        {
            title: 'Chiffon Long Dress',
            brand: 'Armani',
            color: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'],
            category: ['Dresses', 'Sweaters', 'Jeans', 'T-Shirts', 'Shoes', 'Hoodies'],
        },
        {
            title: 'Ruffle Trim Dress',
            brand: 'Versace',
            color: ['Red', 'Blue', 'Green', 'Yellow'],
            category: ['Dresses', 'Sweaters', 'Jeans', 'T-Shirts', 'Shoes', 'Hoodies'],
        },
        {
            title: 'Knitted Midi Dress',
            brand: 'Gucci',
            color: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'],
            category: ['Sweaters'],
        },
        {
            title: 'Silk Blend Midi Dress',
            brand: 'Prada',
            color: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'],
            category: ['Dresses'],
        },
    ],
    filtered: [],
};

const reducer = (state = initialState, action) => {
    console.log('state', state);

    switch (action.type) {
        case 'FILTER_BRAND':
            const filtered = filterItems(state.productList, action.payload);
            return { ...state, filtered };
        default:
            return state;
    }
};
export default reducer;

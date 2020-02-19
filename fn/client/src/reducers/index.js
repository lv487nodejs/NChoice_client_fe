import { filterAddItems, filterRemoveItems } from './filterAddItems';

const initialState = {
    productList: [
        {
            title: 'Chiffon Long Dress',
            brand: 'Armani',
            color: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'],
            category: 'Dresses',
            price: 21212,
        },
        {
            title: 'Ruffle Trim Dress',
            brand: 'Versace',
            color: ['Red', 'Blue', 'Green', 'Yellow'],
            category: 'Jeans',
            price: 546,
        },
        {
            title: 'Knitted Midi Dress',
            brand: 'Gucci',
            color: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'],
            category: 'Sweaters',
            price: 8146,
        },
        {
            title: 'Silk Blend Midi Dress',
            brand: 'Prada',
            color: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'],
            category: 'Shoes',
            price: 1146,
        },
    ],
    filtered: [],
};

const reducer = (state = initialState, action) => {
    console.log('state', state);
    switch (action.type) {
        case 'FILTER_ADD_BRAND': {
            const idx = state.filtered.findIndex(item => item.brand === action.payload);
            const newItem = state.productList.filter((item) => item.brand === action.payload)
            console.log(newItem);

            return {
                ...state,
                filtered: filterAddItems(state.filtered, newItem, idx),
            };
        }
        case 'FILTER_REMOVE_BRAND': {
            return { ...state, filtered: filterRemoveItems(state.filtered, 'brand', action.payload) };
        }
        case 'FILTER_ADD_CATEGORY': {
            const newItem = state.productList.filter(
                item => item.category.toLowerCase() === action.payload.toLowerCase()
            );
            const idx = state.filtered.findIndex(item => item.сategory === action.payload);

            return {
                ...state,
                filtered: filterAddItems(state.filtered, newItem, idx),
            };
        }
        case 'FILTER_REMOVE_CATEGORY':
            return { ...state, filtered: filterRemoveItems(state.filtered, 'category', action.payload) };

        default:
            return state;
    }
};

export default reducer;

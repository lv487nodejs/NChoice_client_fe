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
    filteredBrand: [],
    filteredCategory: [],
    filtered: [],
};

const reducer = (state = initialState, action) => {
    console.log('state', state);
    switch (action.type) {
        case 'FILTER_ADD_BRAND': {
            const idx = state.filtered.findIndex(item => item.brand === action.payload);
            const newItem = state.productList.filter(item => item.brand === action.payload);
            console.log(newItem);

            return {
                ...state,
                filteredBrand: filterAddItems(state.filteredBrand, newItem, idx),
            };
        }
        case 'FILTER_REMOVE_BRAND': {
            return { ...state, filteredBrand: filterRemoveItems(state.filteredBrand, 'brand', action.payload) };
        }
        case 'FILTER_ADD_CATEGORY': {
            const newItem = state.productList.filter(
                item => item.category.toLowerCase() === action.payload.toLowerCase()
            );
            const idx = state.filteredCategory.findIndex(item => item.сategory === action.payload);

            return {
                ...state,
                filteredCategory: filterAddItems(state.filteredCategory, newItem, idx),
            };
        }
        case 'FILTER_REMOVE_CATEGORY': {
            return {
                ...state,
                filteredCategory: filterRemoveItems(state.filteredCategory, 'category', action.payload),
            };
        }
        case 'COMPOSE_FILTERED': {
            state.filtered = [...state.filteredBrand, ...state.filteredCategory]
            let unique = [...new Set(state.filtered)]
            console.log('unigue', unique);

            return {
                ...state,
                filtered: [...unique]
            };
        }
        default:
            return state;
    }
};

export default reducer;

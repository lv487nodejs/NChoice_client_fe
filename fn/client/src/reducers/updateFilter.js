const filterAddItems = (arrToFilter = [], item, idx) => {
    if (idx < 0) {
        return [...arrToFilter, ...item];
    }
    return [...arrToFilter.slice(0, idx), ...item, ...arrToFilter.slice(idx + 1)];
};
const filterRemoveItems = (arrToFilter = [], category, filterItem) => {
    console.log(category, ' : ', filterItem);

    return arrToFilter.filter(item => item[category][category] !== filterItem);
};

const updateFilter = (state, action) => {
    if (state === undefined) {
        state = {
            productList: [
                {
                    catalog: { catalog: 'women' },
                    category: { category: 'jeans' },
                    brand: { brand: 'Versace' },
                    title: 'daleki',
                    description: 'daleki zori vasylia',
                    color: { color: 'red' },
                    images: ['shoes.jpg'],
                    properties: {
                        size: '38',
                        available: '25',
                        sku: 'JD790J2S',
                        mrsp: 213,
                        price: 180,
                    },
                },
                {
                    catalog: { catalog: 'man' },
                    category: { category: 'shoes' },
                    brand: { brand: 'Gucci' },
                    title: 'daleki',
                    description: 'daleki zori vasylia',
                    color: { color: 'red' },
                    images: ['shoes.jpg'],
                    properties: {
                        size: '38',
                        available: '25',
                        sku: 'JD790J2S',
                        mrsp: 213,
                        price: 180,
                    },
                },
                {
                    catalog: { catalog: 'women' },
                    category: { category: 'dress' },
                    brand: { brand: 'Armani' },
                    title: 'daleki',
                    description: 'daleki zori vasylia',
                    color: { color: 'red' },
                    images: ['shoes.jpg'],
                    properties: {
                        size: '38',
                        available: '25',
                        sku: 'JD790J2S',
                        mrsp: 213,
                        price: 180,
                    },
                },
                {
                    catalog: { catalog: 'women' },
                    category: { category: 'sweaters' },
                    brand: { brand: 'Prada' },
                    title: 'daleki',
                    description: 'daleki zori vasylia',
                    color: { color: 'red' },
                    images: ['shoes.jpg'],
                    properties: {
                        size: '38',
                        available: '25',
                        sku: 'JD790J2S',
                        mrsp: 213,
                        price: 180,
                    },
                },
            ],

            filteredBrand: [],
            filteredCategory: [],
            filtered: [],
            posts: [],
            currentPage: [],
            postPerPage: [],
        };
    }
    switch (action.type) {
        case 'FILTER_ADD_BRAND': {
            const idx = state.filtered.findIndex(item => item.brand.brand.toLowerCase() === action.payload.toLowerCase());
            const newItem = state.productList.filter(item => item.brand.brand.toLowerCase() === action.payload.toLowerCase());
            console.log(newItem);

            return {
                ...state,
                filteredBrand: filterAddItems(state.filteredBrand, newItem, idx),
            };
        }
        case 'FILTER_REMOVE_BRAND': {
            return {
                ...state,
                filteredBrand: filterRemoveItems(state.filteredBrand, 'brand', action.payload),
            };
        }
        case 'FILTER_ADD_CATEGORY': {
            const newItem = state.productList.filter(
                item => item.category.category === action.payload
            );
            const idx = state.filteredCategory.findIndex(item => {
            console.log(item.category);
            
                return item.сategory === action.payload});

            return {
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
            state.filtered = [...state.filteredBrand, ...state.filteredCategory];
            const unique = [...new Set(state.filtered)];
            return {
                ...state,
                filtered: [...unique],
            };
        }
        default:
            return state;
    }
};

export { updateFilter };

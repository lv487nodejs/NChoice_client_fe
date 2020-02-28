const filterRemoveItems = (arrToFilter = [], filterItem) => arrToFilter.filter(item => item !== filterItem);

const filter = (state, action) => {
    console.log(state);

    if (state === undefined) {
        state = {
            products: [],
            brands: [],
            colors: [],
            category: [],
            posts: [],
            currentPage: [],
            postPerPage: [],
            receivedBrands: [],
            receivedCategories: [],
            receivedColors: [],
        };
    }
    switch (action.type) {
        case 'FILTER_ADD_BRAND': {
            return {
                ...state,
                brands: [...state.brands, action.payload],
            };
        }
        case 'FILTER_REMOVE_BRAND': {
            return {
                ...state,
                brands: filterRemoveItems(state.brands, action.payload),
            };
        }
        case 'FILTER_ADD_CATEGORY': {
            return { ...state, category: [...state.category, action.payload] };
        }
        case 'FILTER_REMOVE_CATEGORY': {
            console.log(action.payload);

            return {
                ...state,
                category: filterRemoveItems(state.category, action.payload),
            };
        }
        case 'FILTER_ADD_COLOR': {
            console.log(state);
            return { ...state, colors: [...state.colors, action.payload] };
        }
        case 'FILTER_REMOVE_COLOR': {
            return {
                ...state,
                colors: filterRemoveItems(state.colors, action.payload),
            };
        }
        case 'FETCH_SUCCESS_BRANDS': {
            return { ...state, receivedBrands: action.payload };
        }
        case 'FETCH_SUCCESS_CATEGORIES': {
            return { ...state, receivedCategories: action.payload };
        }
        case 'FETCH_SUCCESS_COLORS': {
            return { ...state, receivedColors: action.payload };
        }
        case 'COMPOSE_FILTERS': {
            const brands = [...new Set(state.brands)];
            const colors = [...new Set(state.colors)];
            const category = [...new Set(state.category)];
            return {
                ...state,
                colors: [...colors],
                brands: [...brands],
                category: [...category],
            };
        }
        case 'COMPOSE_RECEIVED_DATA': {
            const productsUnique = [
                ...new Set(state.receivedBrands, ...state.receivedCategories, ...state.receivedColors),
            ];

            return {
                ...state,
                products: [...productsUnique],
            };
        }
        default:
            return state;
    }
};

export default filter;

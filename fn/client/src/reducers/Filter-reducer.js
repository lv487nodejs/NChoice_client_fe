const filterRemoveItems = (arrToFilter = [], filterItem) => arrToFilter.filter(item => item !== filterItem);
const instate = {
    brand: [],
    products: [],
    category: [],
    color: [],
    receivedBrands: [],
    receivedCategories: [],
    receivedColors: [],
};

const filter = (state = instate, action) => {
    console.log(state);

<<<<<<< HEAD

=======
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
>>>>>>> af1c8b39e8f8f089175e5845a50955a5a0a2da31
    switch (action.type) {
        case 'FILTER_ADD_BRAND': {
            return {
                ...state,
                brand: [...state.brand, action.payload],
            };
        }
        case 'FILTER_REMOVE_BRAND': {
            return {
                ...state,
                brand: filterRemoveItems(state.brand, action.payload),
            };
        }
        case 'FILTER_ADD_CATEGORY': {
            return { ...state, category: [...state.category, action.payload] };
        }
        case 'FILTER_REMOVE_CATEGORY': {

            return {
                ...state,
                category: filterRemoveItems(state.category, action.payload),
            };
        }
        case 'FILTER_ADD_COLOR': {
            return { ...state, color: [...state.color, action.payload] };
        }
        case 'FILTER_REMOVE_COLOR': {
            return {
                ...state,
                color: filterRemoveItems(state.color, action.payload),
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
            const brand = [...new Set(state.brand)];
            const color = [...new Set(state.color)];
            const category = [...new Set(state.category)];
            return {
                ...state,
                color: [...color],
                brand: [...brand],
                category: [...category],
            };
        }
        case 'COMPOSE_RECEIVED_DATA': {
<<<<<<< HEAD
   const productsUnique = [
=======
            const productsUnique = [
>>>>>>> af1c8b39e8f8f089175e5845a50955a5a0a2da31
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

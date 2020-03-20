const filterRemoveItems = (arrToFilter = [], filterItem) =>
  arrToFilter.filter((item) => item !== filterItem);
const instate = {
  brand: [],
  products: [],
  category: [],
  color: [],
  receivedBrands: [],
  receivedCategories: [],
  receivedColors: [],
  searchTerm: '',
  searchValue: '',
};

const filter = (state = instate, action) => {
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
    case 'FILTER_REMOVE_ALL_CATEGORIES': {
      return {
        ...state,
        category: [],
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
      const productsUnique = [
        ...new Set(
          state.receivedBrands,
          ...state.receivedCategories,
          ...state.receivedColors
        ),
      ];

      return {
        ...state,
        products: [...productsUnique],
      };
    }
    case 'FILTER_BY_NAME': {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }
    case 'CLEAR_FIELD': {
      return {
        ...state,
        searchValue: action.payload,
      };
    }
    default:
      return state;
  }
};

export default filter;

const initialState = {
    products: [],
    product: {},
    currency: 1,
    loading: true,
    currentPage: 1,
    postsPerPage: 15,
    pagesCount: 1,
    sort: 0,
    cartItems: [],
    orderTotal: 0,
    countTotal: 0,
};
// =====cart
const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
    }

    if (idx < 0) {
        return [...cartItems, item];
    }
    return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};
const updateCartItem = (product, item = {}, quantity = 1) => {
    const { id = product.id, title = product.title, count = 0, price = +product.price, total = 0 } = item;

    return {
        id,
        title,
        price,
        count: count + quantity,
        total: total + quantity * product.price,
    };
};
const updateOrder = (state, action, quantity) => {
    console.log(state);

    const product = state.products.find(item => item.id === action.payload);
    const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
    const item = state.cartItems[itemIndex];

    const stNewItem = updateCartItem(product, item, quantity);

    return {
        ...state,
        cartItems: updateCartItems(state.cartItems, stNewItem, itemIndex),
        orderTotal: state.orderTotal + quantity * product.price,
        countTotal: state.countTotal + quantity * product.count,
    };
};

const productsList = (state = initialState, action) => {
    console.log(state);

    switch (action.type) {
        case 'PRODUCTS_REQUESTED':
            return {
                ...state,
                loading: true,
            };

        case 'PRODUCTS_LOADED':
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case 'CURRENCY_CHANGE':
            return {
                ...state,
                currency: action.payload,
                loading: false,
            };
        case 'ADD_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.payload,
                loading: false,
            };
        }
        case 'ADD_POSTS_PER_PAGE': {
            return {
                ...state,
                postsPerPage: action.payload,
            };
        }
        case 'ADD_PAGES_COUNT': {
            return {
                ...state,
                pagesCount: action.payload,
            };
        }
        // cart reducer
        case 'ALL_PRODUCTS_REMOVED_FROM_CART':
            const removedItem = state.cartItems.find(item => item.id === action.payload);
            console.log(removedItem.count);

            const newCartItems = state.cartItems.filter(item => item.id !== action.payload);
            console.log(' ============================');
            console.log(newCartItems);

            return updateOrder(state, action, -removedItem.count);

        case 'PRODUCT_ADDED_TO_CART':
            return updateOrder(state, action, 1);
        case 'PRODUCT_REMOVED_FROM_CART':
            return updateOrder(state, action, -1);
        case 'ADD_SORT': {
            return {
                ...state,
                sort: action.payload,
            };
        }
        default:
            return state;
    }
};

export default productsList;

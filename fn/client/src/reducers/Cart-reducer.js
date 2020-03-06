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
    const {
        id = product.id,
        idx = product.idx,
        title = product.title,
        count = 0,
        price = product.price,
        total = 0,
    } = item;

    return {
        id,
        idx,
        title,
        price,
        count: count + quantity,
        total: total + quantity * product.price,
    };
};
const updateOrder = (state, action, quantity) => {
    console.log(state);
    
    const product = state.productsList.products.find(item => item.id === action.payload);
    const itemIndex = state.cart.cartItems.findIndex(item => item.id === action.payload);
    const item = state.cart.cartItems[itemIndex];

    const stNewItem = updateCartItem(product, item, quantity);

    return {
        ...state,
        cartItems: updateCartItems(state.cart.cartItems, stNewItem, itemIndex),
        orderTotal: state.cart.orderTotal + quantity * product.price,
        countTotal: state.cart.countTotal + quantity * product.count,
    };
};
const cart = (state, action) => {
    console.log(state);
    if (state === undefined) {
        state = {
            cart:{
                cartItems: [],
                orderTotal: 0,
                countTotal: 0,
            }
        };
    }
    switch (action.type) {
        case 'ALL_PRODUCTS_REMOVED_FROM_CART':
            const removedItem = state.cart.cartItems.find(item => item.id === action.payload);
            console.log(removedItem.count);

            const newCartItems = state.cart.cartItems.filter(item => item.id !== action.payload);
            console.log(' ============================');
            console.log(newCartItems);

            return updateOrder(state, action, -removedItem.count);

        case 'PRODUCT_ADDED_TO_CART':
            return updateOrder(state, action, 1);
        case 'PRODUCT_REMOVED_FROM_CART':
            return updateOrder(state, action, -1);
        default:
            return state;
    }
};
export default cart;

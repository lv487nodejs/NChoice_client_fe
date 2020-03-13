const initialState = {
  cartNumbers: 0,
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_CART':
      console.log(state.products);
      return {
        ...state,
        cartNumbers: state.cartNumbers + 1,
        products: [...state.products, action.payload],
      };
    case 'GET_NUMBERS_CART':
      return {
        ...state
      };
    default:
      return state
  }
}

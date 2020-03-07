const initialState = {
  cartNumbers: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_CART':
      return{
        cartNumbers: state.cartNumbers + 1
      };
    case 'GET_NUMBERS_CART':
      return{
        ...state
      };
    default:
      return state
  }
}

const initialState = {
  cartNumbers: 0,
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_CART':
      let newProducts = [...state.products];

      let foundProduct = newProducts.find(value => action.payload.id === value.id);
      if (foundProduct) {
        foundProduct.quantity++;
      } else {
        newProducts.push({...action.payload, quantity: 1});
      }

      return {
        ...state,
        cartNumbers: state.cartNumbers + 1,
        products: newProducts,
      };
    case 'GET_NUMBERS_CART':
      return {
        ...state
      };
    default:
      return state
  }
}

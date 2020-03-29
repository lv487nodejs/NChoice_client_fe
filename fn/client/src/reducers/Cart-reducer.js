const initialState = {
  cartNumbers: 0,
  products: [],
  currency: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case 'ADD_PRODUCT_TO_CART':
      let newProducts = [...state.products];
      let foundProduct = newProducts.find(item => action.payload.id === item.id);
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

      case 'CURRENCY_CHANGE_CART':
        return {
            ...state,
            currency: action.payload,
        };

    case 'INCREASE_TO_CART':
        return{
          ...state,
          cartNumbers: state.cartNumbers + 1,
        }

    case 'DECREASE_TO_CART':
        return{
          ...state,
          cartNumbers: state.cartNumbers - 1,
        }

    case 'REMOVE_FROM_CART':
      return{
        ...state,
        cartNumbers:  state.cartNumbers - action.payload,
      }

    default:
      return state
  }
}

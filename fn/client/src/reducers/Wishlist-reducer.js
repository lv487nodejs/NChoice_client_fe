const initialState = {
    products: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT_WISHLIST':
        let newProducts = [...state.products];

        let foundProduct = newProducts.map(value => action.payload.id === value.id);
        if (foundProduct) {
          newProducts.push({...action.payload});
        }
  
        return {
          products: newProducts,
        };
      default:
        return state
    }
  }
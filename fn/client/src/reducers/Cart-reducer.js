const initialState = {
  cartNumbers: 0,
  products: [],
  currency: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      let newProducts = [...state.products];
      let foundProduct = newProducts.find(item => action.payload.id === item.id);
      if (foundProduct) {
        foundProduct.quantity++;
      } else {
        newProducts.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("products-collection", JSON.stringify(newProducts));
      localStorage.setItem("cart-numbers", (state.cartNumbers + 1));

      return {
        ...state,
        cartNumbers: state.cartNumbers + 1,
        products: newProducts
      };

    case "INCREASE_TO_CART":
      let newIncreaseProducts = [...state.products];
      let foundIncreaseItems = newIncreaseProducts.find(item => action.payload.id === item.id);
      foundIncreaseItems.quantity += 1;
      localStorage.setItem("products-collection", JSON.stringify(newIncreaseProducts));
      localStorage.setItem("cart-numbers", (state.cartNumbers + 1));
      return {
        ...state,
        products: newIncreaseProducts,
        cartNumbers: state.cartNumbers + 1
      };


    case "DECREASE_TO_CART":
      let new_products = [...state.products];
      let foundItem = new_products.find(item => action.payload.id === item.id);

      //if the quantity == 0 then it should be removed
      if (foundItem.quantity === 1) {
        let new_items = state.products.filter(item => action.payload.id !== item.id);
        localStorage.setItem("products-collection", JSON.stringify(new_items));
        localStorage.setItem("cart-numbers", (state.cartNumbers - 1));

        return {
          ...state,
          cartNumbers: state.cartNumbers - 1,
          products: new_items
        };
      } else {
        foundItem.quantity -= 1;
        localStorage.setItem("products-collection", JSON.stringify(new_products));
        localStorage.setItem("cart-numbers", (state.cartNumbers - 1));

        return {
          ...state,
          products: new_products,
          cartNumbers: state.cartNumbers - 1
        };
      }

    case "REMOVE_FROM_CART":
      let newItems = state.products.filter(item => action.payload.id !== item.id);
      let itemToRemove = state.products.find(item => action.payload.id === item.id);
      let quantity = 0;
      if (itemToRemove) {
        localStorage.setItem("products-collection", JSON.stringify(newItems));
        quantity = itemToRemove.quantity;
        localStorage.setItem("cart-numbers", (state.cartNumbers - quantity));
        return {
          ...state,
          cartNumbers: state.cartNumbers - quantity,
          products: newItems
        };
      } else {
        localStorage.setItem("cart-numbers", "0");
        return {
          ...state,
          cartNumbers: 0,
          products: newItems
        };
      }

    case "CURRENCY_CHANGE_CART":
      return {
        ...state,
        currency: action.payload
      };

    default:
      return state;
  }
}

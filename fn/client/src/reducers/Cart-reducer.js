const initialState = {
  cartNumbers: 0,
  cartProducts: [],
  currency: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      let newProducts = [...state.cartProducts];
      let foundProduct = newProducts.find(
        item => action.payload.id === item.id && action.payload.propetries.size === item.propetries.size);
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
        cartProducts: newProducts
      };

    case "INCREASE_TO_CART":
      let newIncreaseProducts = [...state.cartProducts];
      let foundIncreaseItems = newIncreaseProducts.find(item => action.payload.propetries._id === item.propetries._id);
      foundIncreaseItems.quantity += 1;
      localStorage.setItem("products-collection", JSON.stringify(newIncreaseProducts));
      localStorage.setItem("cart-numbers", (state.cartNumbers + 1));
      return {
        ...state,
        cartProducts: newIncreaseProducts,
        cartNumbers: state.cartNumbers + 1
      };


    case "DECREASE_TO_CART":
      let new_products = [...state.cartProducts];
      let foundItem = new_products.find(item => action.payload.propetries._id === item.propetries._id);

      //if the quantity == 0 then it should be removed
      if (foundItem.quantity === 1) {
        let new_items = state.cartProducts.filter(item => item => action.payload.propetries._id === item.propetries._id);
        localStorage.setItem("products-collection", JSON.stringify(new_items));
        localStorage.setItem("cart-numbers", (state.cartNumbers - 1));

        return {
          ...state,
          cartNumbers: state.cartNumbers - 1,
          cartProducts: new_items
        };
      } else {
        foundItem.quantity -= 1;
        localStorage.setItem("products-collection", JSON.stringify(new_products));
        localStorage.setItem("cart-numbers", (state.cartNumbers - 1));

        return {
          ...state,
          cartProducts: new_products,
          cartNumbers: state.cartNumbers - 1
        };
      }

    case "REMOVE_FROM_CART":
      let newItems = state.cartProducts.filter(item => action.payload.propetries._id !== item.propetries._id);
      let itemToRemove = state.cartProducts.find(item => action.payload.propetries._id === item.propetries._id);
      let quantity = 0;
      if (itemToRemove) {
        localStorage.setItem("products-collection", JSON.stringify(newItems));
        quantity = itemToRemove.quantity;
        localStorage.setItem("cart-numbers", (state.cartNumbers - quantity));
        return {
          ...state,
          cartNumbers: state.cartNumbers - quantity,
          cartProducts: newItems
        };
      } else {
        localStorage.setItem("products-collection", JSON.stringify(newItems));
        localStorage.setItem("cart-numbers", state.cartNumbers);
        return {
          ...state,
          cartNumbers: 0,
          cartProducts: newItems
        };
      }

    case "CURRENCY_CHANGE_CART":
      return {
        ...state,
        currency: action.payload
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartProducts: [],
        cartNumbers: 0
      };

    default:
      return state;
  }
}

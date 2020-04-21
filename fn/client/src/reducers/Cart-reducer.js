import axios from "axios";
import { getUserIdLS, getCartProductsLS, getCartNumbersLS, setCartProductsLS, setCartNumbersLS } from "../services/localStor";

const initialState = { cartNumbers: 0, cartProducts: [] }

const userId = getUserIdLS();
const productCollection = getCartProductsLS()
const localCartNumbers = getCartNumbersLS();

const saveCart = async (userId, cart) => {
  axios.put(`https://lv487node-backend.herokuapp.com/users/cart/${userId}`, { cart });
}

const setInitial = async () => {
  if (userId) {
    const res = await axios.get(`https://lv487node-backend.herokuapp.com/users/${userId}`);
    const { cart } = res.data.user
    if (!cart) {
      saveCart(userId, { cartNumbers: 0, cartProducts: [] })
      return
    }
    initialState.cartNumbers = cart.cartNumbers
    initialState.cartProducts = cart.cartProducts
    return
  }

  if (productCollection && localCartNumbers) {
    initialState.cartNumbers = localCartNumbers
    initialState.cartProducts = productCollection
  }
};

setInitial()

const addToCart = (state, payload) => {
  let newProducts = [...state.cartProducts];
  let foundProduct = newProducts.find(
    item => payload.id === item.id && payload.propetries.size === item.propetries.size);
  if (foundProduct) {
    foundProduct.quantity++;
  } else {
    newProducts.push({ ...payload, quantity: 1 });
  }

  if (userId) {
    const cart = { cartNumbers: state.cartNumbers + 1, cartProducts: newProducts }
    saveCart(userId, cart)
  }
  setCartProductsLS(newProducts)
  setCartNumbersLS(state.cartNumbers + 1)
  // localStorage.setItem("products-collection", JSON.stringify(newProducts));
  // localStorage.setItem("cart-numbers", (state.cartNumbers + 1));

  return {
    ...state,
    cartNumbers: state.cartNumbers + 1,
    cartProducts: newProducts
  };
};

const increaseToCart = (state, payload) => {
  let newIncreaseProducts = [...state.cartProducts];
  let foundIncreaseItems = newIncreaseProducts.find(item => payload.propetries._id === item.propetries._id);
  foundIncreaseItems.quantity += 1;

  if (userId) {
    const cart = { cartNumbers: state.cartNumbers + 1, cartProducts: newIncreaseProducts }
    saveCart(userId, cart)
  }
  setCartProductsLS(newIncreaseProducts)
  setCartNumbersLS(state.cartNumbers + 1)
  return {
    ...state,
    cartProducts: newIncreaseProducts,
    cartNumbers: state.cartNumbers + 1
  };
};

const decreaseToCart = (state, payload) => {
  let new_products = [...state.cartProducts];
  let foundItem = new_products.find(item => payload.propetries._id === item.propetries._id);

  //if the quantity == 0 then it should be removed
  if (foundItem.quantity === 1) {
    let new_items = state.cartProducts.filter(item => payload.propetries._id !== item.propetries._id);

    if (userId) {
      const cart = { cartNumbers: state.cartNumbers - 1, cartProducts: new_items }
      saveCart(userId, cart)
    }
    setCartProductsLS(new_items)
    setCartNumbersLS(state.cartNumbers - 1)

    return {
      ...state,
      cartNumbers: state.cartNumbers - 1,
      cartProducts: new_items
    };
  } else {
    foundItem.quantity -= 1;
    setCartProductsLS(new_products)
    setCartNumbersLS(state.cartNumbers - 1)

    return {
      ...state,
      cartProducts: new_products,
      cartNumbers: state.cartNumbers - 1
    };
  }
};

const removeFromCart = (state, payload) => {
  let newItems = state.cartProducts.filter(item => payload.propetries._id !== item.propetries._id);
  let itemToRemove = state.cartProducts.find(item => payload.propetries._id === item.propetries._id);
  let quantity = 0;
  if (itemToRemove) {
    setCartProductsLS(newItems)
    quantity = itemToRemove.quantity;
    setCartNumbersLS(state.cartNumbers - quantity)

    if (userId) {
      const cart = { cartNumbers: state.cartNumbers - quantity, cartProducts: newItems }
      saveCart(userId, cart)
    }

    return {
      ...state,
      cartNumbers: state.cartNumbers - quantity,
      cartProducts: newItems
    };
  } else {
    setCartProductsLS(newItems)
    setCartNumbersLS(state.cartNumbers)

    if (userId) {
      const cart = { cartNumbers: state.cartNumbers, cartProducts: newItems }
      saveCart(userId, cart)
    }

    return {
      ...state,
      cartNumbers: 0,
      cartProducts: newItems
    };
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return addToCart(state, action.payload);

    case "INCREASE_TO_CART":
      return increaseToCart(state, action.payload);

    case "DECREASE_TO_CART":
      return decreaseToCart(state, action.payload);

    case "REMOVE_FROM_CART":
      return removeFromCart(state, action.payload);

    case "SET_CART":
      return {
        cartProducts: action.payload.cartProducts,
        cartNumbers: action.payload.cartNumbers,
      };
    case "CLEAR_CART":

      if (userId) {
        const cart = { cartNumbers: 0, cartProducts: [] }
        saveCart(userId, cart)
      }

      return {
        cartProducts: [],
        cartNumbers: 0
      };

    default:
      return state;
  }
}

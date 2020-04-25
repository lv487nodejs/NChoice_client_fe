import axios from "axios";

const initialState = { cartNumbers: 0, cartProducts: [] }

const userId = JSON.parse(localStorage.getItem("userId"));
const token = JSON.parse(localStorage.getItem("accessToken"));
const productCollection = JSON.parse(localStorage.getItem("products-collection"));
const localCartNumbers = JSON.parse(localStorage.getItem("cart-numbers"));

const saveCart = async (userId, data, token) => {
  console.log(token)
  console.log(data, 'DATA')
  console.log(userId)
  // const user = await axios({ method: 'GET', url: `http://localhost:5000/users/${userId}`, headers: { "x-auth-token": token } })
  // const newUserCart = {  ...user }
  // console.log(newUserCart, 'newUserCart')
  // const finalUser = newUserCart.data.user.cart = data
  // console.log(finalUser, 'finaluser')
  return axios({ method: 'PUT', url: `http://localhost:5000/users/cart/${userId}`, data , headers: { "x-auth-token": token } })
};

const setInitial = async () => {
    if (userId) {
      const res = await axios({ method: 'GET', url: `http://localhost:5000/users/${userId}`, headers: { "x-auth-token": token } });
      const { cart } = res.data.user
      if (!cart) {
        saveCart(userId, { cartNumbers: 0, cartProducts: [] })
        return
      }
      initialState.cartNumbers = cart.cartNumbers
      initialState.cartProducts = cart.cartProducts
      console.log(initialState.cartNumbers)
      console.log(initialState.cartProducts)
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

  if(userId) {
    const cart = { cartNumbers: state.cartNumbers + 1, cartProducts: newProducts }
    saveCart(userId, cart, token)
  }

  localStorage.setItem("products-collection", JSON.stringify(newProducts));
  localStorage.setItem("cart-numbers", (state.cartNumbers + 1));

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

  if(userId) {
    const cart = { cartNumbers: state.cartNumbers + 1, cartProducts: newIncreaseProducts }
    saveCart(userId, cart, token)
  }

  localStorage.setItem("products-collection", JSON.stringify(newIncreaseProducts));
  localStorage.setItem("cart-numbers", (state.cartNumbers + 1));
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

    if(userId) {
      const cart = { cartNumbers: state.cartNumbers - 1, cartProducts: new_items }
      saveCart(userId, cart, token)
    }

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
};

const removeFromCart = (state, payload) => {
  let newItems = state.cartProducts.filter(item => payload.propetries._id !== item.propetries._id);
  let itemToRemove = state.cartProducts.find(item => payload.propetries._id === item.propetries._id);
  let quantity = 0;
  if (itemToRemove) {
    localStorage.setItem("products-collection", JSON.stringify(newItems));
    quantity = itemToRemove.quantity;
    localStorage.setItem("cart-numbers", (state.cartNumbers - quantity));

    if(userId) {
      const cart = { cartNumbers: state.cartNumbers - quantity, cartProducts: newItems }
      saveCart(userId, cart, token)
    }

    return {
      ...state,
      cartNumbers: state.cartNumbers - quantity,
      cartProducts: newItems
    };
  } else {
    localStorage.setItem("products-collection", JSON.stringify(newItems));
    localStorage.setItem("cart-numbers", state.cartNumbers);

    if(userId) {
      const cart = { cartNumbers: state.cartNumbers, cartProducts: newItems }
      saveCart(userId, cart, token)
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
  
      if(userId) {
        const cart = { cartNumbers: 0, cartProducts: [] }
        saveCart(userId, cart, token)
      }

      return {
        cartProducts: [],
        cartNumbers: 0
      };

    default:
      return state;
  }
}

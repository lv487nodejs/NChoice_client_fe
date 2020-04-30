import axios from "axios"
import { getFromLocalStorage, setToLocalStorage } from "../services/localStoreService"
import { _baseUrl } from '../configs/frontend-config'

const productCollection = getFromLocalStorage('wishlist_collection')
const userId = getFromLocalStorage('userId')
const accessToken = getFromLocalStorage('accessToken');

const initialState = {
  products: productCollection || [],
};

const saveWishList = async (userId, data, token) => {
  axios({ method: 'PUT', url: `${_baseUrl}users/wish/${userId}`, data, headers: { "x-auth-token": token } })
}
const setInitial = async () => {
  if (userId) {
    const res = await axios({ method: 'GET', url: `${_baseUrl}users/${userId}`, headers: { "x-auth-token": accessToken } });
    const { wishlist } = res.data.user

    initialState.products = wishlist
    return
  }

  if (productCollection) {
    initialState.products = productCollection
  }
};

setInitial()

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_WISHLIST':
      let newProducts = state.products;
      let foundProduct = newProducts.find(value => action.payload.id === value.id);
      if (!foundProduct) {
        newProducts.unshift(action.payload);
      }
      if (userId){
        const wishlist = { products: newProducts }
        saveWishList(userId, wishlist, accessToken)
      }
      setToLocalStorage('wishlist_collection', newProducts)
      return {
        ...state,
        products: newProducts,
      };
    case "REMOVE_FROM_WISHLIST":
      let newItems = state.products.filter(item => action.payload.id !== item.id);
      if (userId) {
        const wishlist = { products: newItems || [] }
        saveWishList(userId, wishlist, accessToken)
      }
      setToLocalStorage('wishlist_collection', newItems)
      return {
        ...state,
        products: newItems
      };

    default:
      return state
  }
}

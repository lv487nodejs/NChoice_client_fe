import { setWishlistLS, getWishlistLS } from "../services/localStor";

const productCollection = getWishlistLS();


const initialState = {
    products: productCollection || [],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT_WISHLIST':
        let newProducts = state.products;
        let foundProduct = newProducts.filter(value => action.payload.id === value.id);
        if (!foundProduct.length) {
          newProducts.push(action.payload);
        }
        setWishlistLS(newProducts)
        return {
          ...state,
          products: newProducts,
        };

      case "REMOVE_FROM_WISHLIST":
        let newItems = state.products.filter(item => action.payload.id !== item.id);
        setWishlistLS(newItems)
        return {
          ...state,
          products: newItems
        };

      default:
        return state
    }
  }

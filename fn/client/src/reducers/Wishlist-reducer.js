import { setWishlistLS } from "../services/localStor";

const productCollection = JSON.parse(localStorage.getItem("wishlist-collection"));


const initialState = {
    products: productCollection || [],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT_WISHLIST':
        let newProducts = state.products;
        let foundProduct = newProducts.map(value => action.payload.id === value.id);
        if (!foundProduct.length) {
          newProducts.push(action.payload);
        }
        localStorage.setItem("wishlist-collection", JSON.stringify(newProducts));
        setWishlistLS(newProducts)
        return {
          ...state,
          products: newProducts,
        };

      case "REMOVE_FROM_WISHLIST":
        let newItems = state.products.filter(item => action.payload.id !== item.id);
        localStorage.setItem("wishlist-collection", JSON.stringify(newItems));

        return {
          ...state,
          products: newItems
        };

      default:
        return state
    }
  }

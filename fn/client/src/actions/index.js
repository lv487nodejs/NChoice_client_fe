import { categoriesLoaded, categoriesRequested } from './Categories-actions';

import {
  setProducts,
  productsLoadingStart,
  currencyChange,
  addCurrentPage,
  addPostsPerPage,
  addPagesCount,
  addSortByPrice,
  setProduct,
  sizesLoaded,
  currencyIconChange,
  productsLoadingStop
} from './Products-actions';

import { addToCart, increaseToCart, decreaseFromCart, removeFromCart } from './Cart-action'
import { addToWishlist, removeFromWishlist } from './Wishlist-actions'

import {
  catalogsLoaded,
  catalogsRequested,
  catalogLoaded,
} from './Catalogs-actions';

import {
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveCategory,
  filterRemoveAllCategories,
  filterRemoveAllBrands,
  filterRemoveColor,
  filterRemoveBrand,
  filterByName,
  setSearchValue,
  setCatalogFilter,
} from './Filter-actions';

import {
  postUserSuccess,
  postUserStarted,
  postUserError,
  logoutUser,
  postUserLoginSuccess,
  setUser
} from './Auth-actions';

import { setShowSnackbar, setSnackbarText } from './Snackbar--actions'

export {
  categoriesRequested,
  categoriesLoaded,
  catalogLoaded,
  catalogsLoaded,
  catalogsRequested,
  setProducts,
  productsLoadingStart,
  productsLoadingStop,
  currencyChange,
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveAllBrands,
  filterRemoveCategory,
  filterRemoveAllCategories,
  filterRemoveColor,
  setCatalogFilter,
  addCurrentPage,
  addPostsPerPage,
  addPagesCount,
  addSortByPrice,
  filterByName,
  setProduct,
  sizesLoaded,
  postUserError,
  postUserSuccess,
  postUserStarted,
  setSearchValue,
  addToCart,
  increaseToCart,
  decreaseFromCart,
  removeFromCart,
  addToWishlist,
  logoutUser,
  currencyIconChange,
  removeFromWishlist,
  postUserLoginSuccess,
  setUser,
  setShowSnackbar,
  setSnackbarText,
};

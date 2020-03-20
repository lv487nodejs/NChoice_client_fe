import { categoriesLoaded, categoriesRequested } from './Categories-actions';

import {
  productsLoaded,
  productsRequested,
  currencyChange,
  addCurrentPage,
  addPostsPerPage,
  addPagesCount,
  addSortByPrice,
  productLoaded,
  sizesLoaded,
} from './Products-actions';

import {addToCart, getNumbers, increaseToCart, decreaseFromCart, removeFromCart} from './Cart-action'
import {addToWishlist} from './Wishlist-actions'

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
  filterRemoveColor,
  filterRemoveBrand,
  filterByName,
  setSearchValue,
} from './Filter-actions';

import {
  postUserSuccess,
  postUserStarted,
  postUserError,
} from './Auth-actions';

export {
  categoriesRequested,
  categoriesLoaded,
  catalogLoaded,
  catalogsLoaded,
  catalogsRequested,
  productsRequested,
  productsLoaded,
  currencyChange,
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveCategory,
  filterRemoveAllCategories,
  filterRemoveColor,
  addCurrentPage,
  addPostsPerPage,
  addPagesCount,
  addSortByPrice,
  filterByName,
  productLoaded,
  sizesLoaded,
  postUserError,
  postUserSuccess,
  postUserStarted,
  setSearchValue,
  addToCart,
  getNumbers,
  increaseToCart,
  decreaseFromCart,
  removeFromCart,
  addToWishlist,
};

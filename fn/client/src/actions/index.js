import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import { productsLoaded, productsRequested, currencyChange } from './Products-actions';
import { catalogsLoaded, catalogsRequested, catalogLoaded } from './Catalogs-actions';
import {addToCart, getNumbers, increaseToCart, decreaseFromCart, removeFromCart} from './Cart-action'
import {addToWishlist} from './Wishlist-actions'

import {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveCategory,
    filterRemoveColor,
    filterRemoveBrand,

} from './Filter-actions';

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
    filterRemoveColor,
    addToCart,
    getNumbers,
    increaseToCart,
    decreaseFromCart,
    removeFromCart,
    addToWishlist
};

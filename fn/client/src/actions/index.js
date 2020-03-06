import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import {
    productsLoaded,
    productsRequested,
    currencyChange,
    addCurrentPage,
    addPostsPerPage,
    addPagesCount,
} from './Products-actions';
import { catalogsLoaded, catalogsRequested, catalogLoaded } from './Catalogs-actions';

import {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveCategory,
    filterRemoveColor,
    filterRemoveBrand,
} from './Filter-actions';

import { productAddedToCart, productRemovedFromCart, allproductsRemovedFromCart } from './Cart-actions';

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
    addCurrentPage,
    addPostsPerPage,
    addPagesCount,
    productAddedToCart,
    productRemovedFromCart,
    allproductsRemovedFromCart,
};

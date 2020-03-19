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
    filterRemoveColor,
    filterRemoveBrand,
    filterByName,
    setSearchValue ,
} from './Filter-actions';

import {
    postUserSuccess,
    postUserStarted,
    postUserError
} from "./Auth-actions";

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
    addSortByPrice,
    filterByName,
    productLoaded,
    sizesLoaded,
    postUserError,
    postUserSuccess,
    postUserStarted,
    setSearchValue ,
};


import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import { productsLoaded, productsRequested } from './Products-actions';

import { catalogLoaded, catalogsLoaded, catalogsRequested } from './Catalogs-actions';

import {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveCategory,
    filterRemoveColor,
    filterRemoveBrand,
    composeFilters,
    fetchSuccessBrands,
    fetchSuccessCategories,
    fetchSuccessColors,
    composeReceivedData,
} from './Filter-actions';

export {
    categoriesLoaded,
    categoriesRequested,
    productsLoaded,
    productsRequested,
    catalogLoaded,
    catalogsLoaded,
    catalogsRequested,
      filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveBrand,
    filterRemoveCategory,
    filterRemoveColor,
    composeFilters,
    fetchSuccessBrands,
    fetchSuccessCategories,
    fetchSuccessColors,
    composeReceivedData,
};

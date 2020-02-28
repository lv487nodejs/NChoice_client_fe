import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import { productsLoaded, productsRequested } from './Products-actions';
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
} from './Filter-actions';

export {
    categoriesRequested,
    categoriesLoaded,
    productsRequested,
    productsLoaded,
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
};

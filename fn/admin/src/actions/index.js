import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import { productsLoaded, productsRequested, currencyChange } from './Products-actions';
import { catalogsLoaded, catalogsRequested, catalogLoaded } from './Catalogs-actions';
import { usersLoaded, usersRequested } from './Users-actions';
import { userLoaded, userRequested } from './User-detail-actions';

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
    usersLoaded,
    usersRequested,
    userLoaded,
    userRequested,
};

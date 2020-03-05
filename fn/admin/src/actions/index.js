import { categoriesLoaded, categoriesRequested } from './Categories-actions';
import {
    productsLoaded,
    productLoaded,
    productsRequested,
    currencyChange,
} from './Products-actions';
import {
    catalogsLoaded,
    catalogsRequested,
    catalogLoaded,
} from './Catalogs-actions';
import {
    usersLoaded,
    usersRequested,
    userEdit,
    userLoaded,
    userRequested,
    userSave,
    userSetRole,
} from './Users-actions';

import {
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveCategory,
    filterRemoveColor,
    filterRemoveBrand,
} from './Filter-actions';

import { themeDark, themeLight } from './Theme-actions';

export {
    categoriesRequested,
    categoriesLoaded,
    catalogLoaded,
    catalogsLoaded,
    catalogsRequested,
    productsRequested,
    productsLoaded,
    productLoaded,
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
    userEdit,
    userSave,
    userSetRole,
    themeDark,
    themeLight,
};

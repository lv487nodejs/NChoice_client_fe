import {
    categoriesSet,
    categoriesStartLoading,
    categorySet,
    successSet,
} from './Categories-actions';
import { brandsLoaded, brandLoaded, brandsRequested } from './Brand-actions';
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
    categoriesSet,
    categoriesStartLoading,
    categorySet,
    successSet,
    catalogLoaded,
    catalogsLoaded,
    catalogsRequested,
    brandsLoaded,
    brandLoaded,
    brandsRequested,
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

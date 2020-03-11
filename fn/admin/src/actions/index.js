import { setCatalog, setCatalogs, catalogLoadingStatus } from './Catalogs-actions';

import { setBrand, setBrands, brandLoadingStatus } from './Brand-actions';

import {
    setCategory,
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
} from './Categories-actions';

import { setProduct, setProducts, setProductPropetries, productLoadingStatus } from './Products-actions';

import {
    usersLoaded,
    usersRequested,
    userEdit,
    userLoaded,
    userRequested,
    userSave,
    userSetRole,
} from './Users-actions';
import { setColors } from './Colors-actions';

export {
    setBrand,
    setBrands,
    brandLoadingStatus,
    setCatalog,
    setCatalogs,
    catalogLoadingStatus,
    setCategory,
    setCategories,
    categoryLoadingStatus,
    setProduct,
    setProducts,
    setProductPropetries,
    setColors,
    productLoadingStatus,
    usersLoaded,
    usersRequested,
    userLoaded,
    userRequested,
    userEdit,
    userSave,
    userSetRole,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
};

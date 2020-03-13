import { setCatalog, setCatalogs, catalogLoadingStatus } from './Catalogs-actions';

import { setBrand, setBrands, brandLoadingStatus } from './Brand-actions';

import { setCategory, setCategories, categoryLoadingStatus } from './Categories-actions';

import {
    setProduct,
    setProducts,
    setProductPropetries,
    productLoadingStatus,
} from './Products-actions';

import { setNewProduct, setNewPropetries, setOptions } from './New-product-actions';

import {
    usersLoaded,
    usersRequested,
    userEdit,
    userLoaded,
    userRequested,
    userSave,
    userSetRole,
} from './Users-actions';

import { setPagesCount, setCurrentPage, setRowsPerPage } from './Paginator-action';

import { setColors } from './Colors-actions';

import { setSnackBar } from './Snackbar-actions';

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
    setNewProduct,
    setNewPropetries,
    setOptions,
    setColors,
    productLoadingStatus,
    usersLoaded,
    usersRequested,
    userLoaded,
    userRequested,
    userEdit,
    userSave,
    userSetRole,
    setSnackBar,
    setPagesCount,
    setCurrentPage,
    setRowsPerPage,
};

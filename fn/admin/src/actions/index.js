import { setCatalog, setCatalogs, catalogLoadingStatus } from './Catalogs-actions';

import {
    setBrand,
    setBrands,
    brandLoadingStatus,
    brandSnackbarOpenTrue,
    brandSnackbarOpenFalse,
} from './Brand-actions';

import {
    setCategory,
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
    categoryUpdateCatalogs,
    categoryLoadingStop,
} from './Categories-actions';

import {
    setProduct,
    setProducts,
    setProductsFilters,
    setProductPropetries,
    setProductLoadingStatus,
} from './Products-actions';

import {
    setProductEdit,
    setProductPropetriesEdit,
    setProductGroupedPropetries,
} from './Product-edit-actions';

import { setUsers, setUser, userLoadingStatus } from './Users-actions';

import { setPagesCount, setCurrentPage, setRowsPerPage } from './Paginator-action';

import { setColors } from './Colors-actions';

import { setSnackBar } from './Snackbar-actions';

import {
    setFilterSelected,
    setCheckBoxStatus,
    setFilterOptionsList,
    setFilterOptionsGroups,
    setFilterCounters,
} from './Filters-action';

import { setSearchValue, setSearchTerm } from './Search-actions';

import { setTableDense } from './Table-actions';

import { setThemeMode } from './Theme-actions';

export {
    setProduct,
    setProducts,
    setProductsFilters,
    setProductPropetries,
    setProductLoadingStatus,
    setProductEdit,
    setProductPropetriesEdit,
    setProductGroupedPropetries,
    setFilterSelected,
    setCheckBoxStatus,
    setFilterOptionsList,
    setFilterOptionsGroups,
    setFilterCounters,
    setBrand,
    setBrands,
    brandLoadingStatus,
    brandSnackbarOpenTrue,
    brandSnackbarOpenFalse,
    setCatalog,
    setCatalogs,
    catalogLoadingStatus,
    setCategory,
    setCategories,
    categoryLoadingStatus,
    setColors,
    setUsers,
    setUser,
    userLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
    categoryUpdateCatalogs,
    categoryLoadingStop,
    setSnackBar,
    setPagesCount,
    setCurrentPage,
    setRowsPerPage,
    setSearchValue,
    setSearchTerm,
    setTableDense,
    setThemeMode,
};

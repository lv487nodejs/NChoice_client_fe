import { setCatalog, setCatalogs, catalogLoadingStatus } from './Catalogs-actions';

import { setBrand, setBrands, brandLoadingStatus } from './Brand-actions';

import { setCategory, setCategories, categoryLoadingStatus } from './Categories-actions';

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
    setCatalog,
    setCatalogs,
    catalogLoadingStatus,
    setCategory,
    setCategories,
    categoryLoadingStatus,
    setColors,
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
    setSearchValue,
    setSearchTerm,
    setTableDense,
    setThemeMode,
};

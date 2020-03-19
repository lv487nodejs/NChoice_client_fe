import { combineReducers } from 'redux';

import catalogsState from './Catalogs-reducer';
import categoriesState from './Categories-reducer';
import brandsState from './Brands-reducer';
import productsState from './Products-reducer';
import usersState from './Users-reducer';
import colorsState from './Colors-reducer';
import productEditState from './Product-edit-reducer';
import snackbarState from './Snackbar-reducer';
import paginationState from './Paginator-reducer';
import filtersState from './Filters-reducer';
import searchState from './Search-reducer';
import tableState from './Table-reducer';
import themeState from './Theme-reducer';

export default combineReducers({
    catalogsState,
    categoriesState,
    brandsState,
    productsState,
    productEditState,
    usersState,
    colorsState,
    snackbarState,
    paginationState,
    filtersState,
    searchState,
    tableState,
    themeState,
});

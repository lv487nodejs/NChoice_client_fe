import { combineReducers } from 'redux';

import catalogsState from './Catalogs-reducer';
import categoriesState from './Categories-reducer';
import brandsState from './Brands-reducer';
import productsState from './Products-reducer';
import usersState from './Users-reducer';

export default combineReducers({
    catalogsState,
    categoriesState,
    brandsState,
    productsState,
    usersState,
});

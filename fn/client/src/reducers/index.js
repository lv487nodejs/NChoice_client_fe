import { combineReducers } from 'redux';
import categoriesList from './Categories-reducer';
import productsList from './Products-reducer';
import catalogsList from './Catalog-reducer';
import filter from './Filter-reducer';
import authReducer  from './Auth-reducer'
import cartReducer from './Cart-reducer';
import wishlistReducer from './Wishlist-reducer'
import snackbarReducer from './Snackbar-reducer'
export default combineReducers({
    productsList,
    categoriesList,
    catalogsList,
    filter,
    cartReducer,
    wishlistReducer,
    authReducer,
    snackbarReducer,
});

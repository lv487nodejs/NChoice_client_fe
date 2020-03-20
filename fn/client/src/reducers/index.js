import { combineReducers } from 'redux';
import categoriesList from './Categories-reducer';
import productsList from './Products-reducer';
import catalogsList from './Catalog-reducer';
import filter from './Filter-reducer';
import cartReducer from './Cart-reducer';
import wishlistReducer from './Wishlist-reducer'

export default combineReducers({
    productsList,
    categoriesList,
    catalogsList,
    filter,
    cartReducer,
    wishlistReducer
});

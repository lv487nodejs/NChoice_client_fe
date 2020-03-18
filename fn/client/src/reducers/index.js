import { combineReducers } from 'redux';
import categoriesList from './Categories-reducer';
import productsList from './Products-reducer';
import catalogsList from './Catalog-reducer';
import filter from './Filter-reducer';
import authReducer  from './Auth-reducer'

export default combineReducers({
    productsList,
    categoriesList,
    catalogsList,
    filter,
    authReducer
});

import { combineReducers } from 'redux';
import categoriesList from './Categories-reducer';
import productsList from './Products-reducer';
import catalogsList from './Catalog-reducer';
import filter from './Filter-reducer';
import usersList from './Users-reducer';

export default combineReducers({
    productsList,
    categoriesList,
    catalogsList,
    filter,
    usersList,
});

import { combineReducers } from 'redux';
import categoriesList from './Categories-reducer';
import productsList from './Products-reducer';
import catalogsList from './Catalog-reducer';

export default combineReducers({
    productsList,
    categoriesList,
    catalogsList,
});

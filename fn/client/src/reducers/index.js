import { combineReducers } from 'redux';
import categories from './Categories-reducer';
import products from './Products-reducer';
import filter from './Filter-reducer';

export default combineReducers({
    products,
    categories,
    filter,
});

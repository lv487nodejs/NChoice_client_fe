import categories from './Categories-reducer';
import products from './Products-reducer';
import filter from './Filter-reducer';
import { combineReducers } from 'redux';
export default combineReducers({
    products,
    categories,
    filter,
})

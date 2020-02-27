import categories from './Categories-reducer';
import products from './Products-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    products,
    categories,
})

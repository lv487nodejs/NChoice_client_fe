import categories from './Categories-reducer';
import products from './Products-reducer';
import catalogs from './Catalog-reducer'

import { combineReducers } from 'redux';

export default combineReducers({
    products,
    categories,
    catalogs,
})

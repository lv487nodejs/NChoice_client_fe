import { createStore } from 'redux';

import reducer from '../reducers';
console.log(reducer)
const store = createStore(reducer);

export default store;

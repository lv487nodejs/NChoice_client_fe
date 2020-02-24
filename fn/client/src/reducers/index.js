// import { combineReducers } from 'redux'
import { fetchCategories } from './fetchCategories';
// export default combineReducers({
//   fetchProducts
// });
const reducer = (state, action) => ({
    ...state,
    products: [...fetchCategories(state, action)],
});
export default reducer;

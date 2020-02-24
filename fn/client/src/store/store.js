import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// const store = createStore(reducer,applyMiddleware(thunk));
//
// export default store;
//
// import { createStore, applyMiddleware } from 'redux';

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
}
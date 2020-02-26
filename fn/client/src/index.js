import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import store from './store/store';
import Provider from 'react-redux/es/components/Provider';
import Catalogs from './reducers'

console.log(Catalogs)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));



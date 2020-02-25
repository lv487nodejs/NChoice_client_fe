import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import store from './store/store';
import Provider from 'react-redux/es/components/Provider';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));



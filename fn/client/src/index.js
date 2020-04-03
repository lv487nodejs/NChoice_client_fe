import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import {StoreService, CartService} from './services';
import { StoreServiceProvider } from './components/store-service-context';

import './index.css';

import store from './store/store';

const storeService = new StoreService();
const cartService = new CartService();
const cartAndStoreService = {storeService, cartService};

ReactDOM.render(
    <Provider store={store}>
        <StoreServiceProvider value={cartAndStoreService}>
            <App />
        </StoreServiceProvider>
    </Provider>,
    document.getElementById('root')
);

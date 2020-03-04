import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/app';

import AdminService from './services';
import { AdminServiceProvider } from './components/context';

import store from './store';

const adminService = new AdminService();

ReactDOM.render(
    <Provider store={store}>
        <AdminServiceProvider value={adminService}>
            <App />
        </AdminServiceProvider>
    </Provider>,
    document.getElementById('root')
);

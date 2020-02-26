import React from 'react';
import './App.css';
import withStoreService from '../hoc'

import Routes from '../routes';

const App = () => {
    return (
        <div className="App">
            <Routes />
        </div>
    );
}

export default App;

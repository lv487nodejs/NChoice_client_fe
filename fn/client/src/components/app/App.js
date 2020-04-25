import React from 'react';
import './App.css';

import Routes from '../routes';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const App = () => (
        <div className="App">
                <Routes />
                <div>
                        <ScrollUpButton ToggledStyle={{right: 30}}/>
                </div>

        </div>
);

export default App;

import React from 'react';
import './App.css';

import Routes from '../routes';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Chat from '../chat';
const App = () => (
        <div className="App">
                <Routes />
                <div>
                        <ScrollUpButton ToggledStyle={{ left: 30, bottom:200 }} />
                </div>
                <Chat />
        </div>
);

export default App;

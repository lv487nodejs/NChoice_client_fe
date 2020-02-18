import React from 'react';
import Row from './components/Row';
import Filter from './components/Filter';
import SortBy from './components/SortBy'
import './App.css';

function App() {
    return <div className="App">
        <Row left={<Filter />} />
    </div>
}

export default App;

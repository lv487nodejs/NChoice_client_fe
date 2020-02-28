import React from 'react';
import  './Row.css';
const Row = ({ left, right }) => (
        <div className="container">
    <div className="d-flex">
            <div className="col col-sm-2">{left}</div>
            <div className="col col-sm-5">{right}</div>
        </div>
    </div>
);

export default Row;

import React from 'react';

const Row = ({ left, right }) => (
    <div className="container">
        <div className="row">
            <div className="col">{left}</div>
            <div className="col">{right}</div>
        </div>
    </div>
);

export default Row;

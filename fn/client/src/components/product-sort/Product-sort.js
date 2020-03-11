import React from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';

const ProductSort = ({ options: { text, value, func } }) => (
    <Button variant="dark" value={value} onClick={() => func(value)}>
        {text}
    </Button>
);

export default ProductSort;

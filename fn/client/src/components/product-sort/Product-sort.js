import React from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';

const ProductSort = ({ value, addSort, sortBy }) => (
    <Button variant="dark" onClick={() => addSort(value)}>
        Sort by price {sortBy}
    </Button>
);
export default ProductSort;

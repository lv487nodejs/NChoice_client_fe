import React from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';

const sortByPrice = function(arrayToSortByPrice) {
    console.log(arrayToSortByPrice[0].propetries[0].price);
    return arrayToSortByPrice.sort((a, b) => a.propetries[0].price - b.propetries[0].price);
};

const ProductSort = ({ arrayToSort }) => (
    <Button variant="primary" onClick={() => console.log(sortByPrice(arrayToSort))}>
        Sort by price
    </Button>
);
export default ProductSort;

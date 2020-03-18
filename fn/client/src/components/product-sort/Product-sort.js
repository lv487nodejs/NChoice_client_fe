import React from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';

const ProductSort = ({ options }) => {
    const buttons = options.map(({ text, value, variant, func }) => (
        <Button key={text} variant={variant} value={value} onClick={() => func(value)}>
            {text}
        </Button>
    ));
    return <div className="flex row flex-wrap">{buttons}</div>;
};

export default ProductSort;

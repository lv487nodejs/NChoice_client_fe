import React, { useState } from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';
import FA from 'react-fontawesome';

const ProductSort = ({ options }) => {
    const [sortValue, setSortValue] = useState(options[0].value);
    const [className, setClassName] = useState(null);
    const changeHandler = () => {
        setSortValue(-sortValue);
        sortValue === 1 ? setClassName('fa fa-arrow-up') : setClassName('fa fa-arrow-down');
        options[0].handler(sortValue)
    }
    const buttons = options.map(({ text, variant }) => (
        <Button key={text} variant={variant} onClick={changeHandler}>
            {text}  <FA className={className} />
        </Button>
    ));
    return <div className="flex row flex-wrap">{buttons}</div>;
};

export default ProductSort;

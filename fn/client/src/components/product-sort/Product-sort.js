import React, { useState } from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';
import FA from 'react-fontawesome';

const ProductSort = ({ options }) => {
  const [sortValue, setSortValue] = useState(options.value);
  const [className, setClassName] = useState(null);
  const changeHandler = () => {
    setSortValue(-sortValue);
    sortValue === 1
      ? setClassName(options.defaultClass)
      : setClassName(options.toChangeClass);
    options.handler(sortValue);
  };

  return  <Button className="sort-button" key={options.text} variant={options.variant} onClick={changeHandler}>
            {options.text} <FA name="sort" className={className ? className : 'fas fa-sort'} />
          </Button>;
};

export default ProductSort;

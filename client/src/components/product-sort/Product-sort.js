import React, { useState } from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';
import FA from 'react-fontawesome';

const ProductSort = ({ options }) => {
  const [sortValue, setSortValue] = useState(1);
  const changeHandler = () => {
    setSortValue(-sortValue);
    options.handler(sortValue);
  };

  return (
    <Button
      className='sort-button'
      key={options.text}
      variant={options.variant}
      onClick={changeHandler}
    >
      {options.text} <FA name='sort' className={options.className} />
    </Button>
  );
};

export default ProductSort;
